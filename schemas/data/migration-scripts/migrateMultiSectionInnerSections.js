// For branch ft/8827-refactor-multisection-2
// Run this script with: `sanity exec --with-user-token migrateMultiSectionInnerSections.js`

// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
// eslint-disable-next-line import/no-unresolved
import cloneDeep from 'lodash.clonedeep';


console.log(`Dataset: ${client.config().dataset}`);

const fetchDocuments = () => client.fetch(
  `*[_type == 'customBackground' 
      && defined(sourceMultiSectionId)
      && defined(sourceDocId)][0] {
        _id,
        sourceMultiSectionId,
        "docToUpdate": *[_id == ^.sourceDocId] {...}
    }`,
);


const buildPatches = docs => docs.map((doc) => {
  const { docToUpdate } = doc;
  const customBgInfo = {
    sourceMultiSectionId: doc.sourceMultiSectionId,
    _id: doc._id,
  };

  const newSections = docToUpdate[0].sections.reduce((acc, section) => {
    if (section._key === customBgInfo.sourceMultiSectionId) {
      // migrate the multisection's styles to the appropriate subsection
      const multiSection = section;
      const subsections = multiSection.sections.map(subsection => ({
        ...cloneDeep(subsection),
        sectionStyles: {
          ...cloneDeep(subsection.sectionStyles),
          backgroundSection: [
            {
              _key: nanoid(),
              _ref: customBgInfo._id,
              _type: 'reference',
            },
          ],
        },
      }));

      return acc.concat(subsections);
    }
    return acc.concat(section);
  }, []);

  return [{
    id: docToUpdate[0]._id,
    patch: {
      set: { sections: newSections },
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  },
  {
    id: doc._id,
    patch: {
      unset: ['sourceMultiSectionId', 'sourceDocId'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }];
});

const createTransaction = patches => patches.reduce(
  (tx, patch) => tx.patch(patch.id, patch.patch),
  client.transaction(),
);

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches([documents]).flat();


  if (patches.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }
  console.log(
    'Migrating batch:\n %s',
    patches
      .map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join('\n'),
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
