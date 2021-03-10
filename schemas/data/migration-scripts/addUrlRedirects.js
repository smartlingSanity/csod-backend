import client from "part:@sanity/base/client";
import { uuid } from "@sanity/uuid";

import urls from "../migrationsData/urls_redirect.json";

const buildPatches = (redirects, existingDocs, existingUrls) =>
  redirects.map(async (doc) => {
    const toUrlString = doc.to || "/";

    const existingDoc = existingDocs.find(
      (d) => d.from.externalLink === doc.from
    );

    const foundDocument = existingUrls.find(
      (d) => d.slug.current === toUrlString
    );

    const patch = {};

    const title = `${doc.from} --> ${toUrlString}`;

    const shared = {
      title,
      to: [
        foundDocument
          ? {
              _key: uuid(),
              _type: "reference",
              _ref: foundDocument._id,
            }
          : {
              _key: uuid(),
              _type: "externalLink",
              externalLink: toUrlString,
            },
      ],
      status: "301",
    };

    if (existingDoc) {
      // update an existing redirect
      patch.id = existingDoc._id;
      patch.patch = {
        set: {
          ...shared,
        },
      };
    } else {
      // create a new redirect
      patch.create = {
        ...shared,
        _type: "redirect",
        from: {
          _key: uuid(),
          _type: "externalLink",
          externalLink: doc.from,
        },
      };
    }

    return patch;
  });

const createTransaction = (patches) =>
  patches.reduce((tx, patch) => {
    if (patch.patch) {
      return tx.patch(patch.id, patch.patch);
    }
    // Add document with new type
    return tx.create(patch.create);
  }, client.transaction());

const migrateNextBatch = async () => {
  const redirects = [...urls].map((u) => ({ from: u.from, to: u.to || "/" }));
  const queries = {
    existingDocuments: `*[_type=="redirect" && from.externalLink in [${redirects.map(
      (d) => `"${d.from}"`
    )}]]`,
    toUrlDocuments: `*[_type=="route" && slug.current in [${redirects.map(
      (d) => `"${d.to}"`
    )}]]`,
  };

  // console.log(JSON.stringify(queries));
  const existingDocs = await client.fetch(queries.existingDocuments);
  // console.log(existingDocs);
  const existingUrls = await client.fetch(queries.toUrlDocuments);
  // console.log(existingUrls.map((u) => u._id));

  const patches = await Promise.all(
    buildPatches(redirects, existingDocs, existingUrls)
  );

  if (patches.length === 0) {
    console.log("No documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n%s`,
    patches
      .map(
        (patch) =>
          `${patch.id} => ${JSON.stringify({
            _type: (patch.create || patch.patch)._type,
            title: (patch.create || patch.patch).title,
          })}`
      )
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await transaction.commit();
  return null;
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
