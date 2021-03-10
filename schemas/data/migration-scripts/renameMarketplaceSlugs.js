import client from 'part:@sanity/base/client';

const fetchDocuments = () =>
  client.fetch(`*[_type == 'route' && slug.current match 'marketplace'][0...100] {_id, _rev, routeName, slug}`);

const buildPatches = docs => {
  const patches = [];
  docs.forEach(doc => {
    if (doc.slug.current.match(/\/marketplace/gi)) {
      const newSlug = doc.slug.current.replace(/marketplace/i, 'partnerecosystem');
      patches.push(
        ({
          id: doc._id,
          patch: {
            set: { 'slug.current': newSlug },
            // this will cause the transaction to fail if the documents has been
            // modified since it was fetched.
            ifRevisionID: doc._rev
          }
        })
      );
    }
  });
  return patches;
};

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction());

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);

  if (patches.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  );
  const transaction = createTransaction(patches);
  await transaction.commit();
  return migrateNextBatch();
};

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})
