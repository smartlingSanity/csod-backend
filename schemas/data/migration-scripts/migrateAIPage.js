// Run this script with: `sanity exec --with-user-token schemas/data/content-migration-scripts/migrateAIPage.js` in /backend

// eslint-disable
import client from 'part:@sanity/base/client';

const fetchDocuments = () => client.fetch(
  '*[_id == "drafts.9e7095b3-cb73-4a22-931b-68b3c87a7193"]',
);

const buildPatches = docs => docs.map(doc => ({
  id: doc._id,
  create: {
    ...doc,
    _id: undefined,
    _type: 'aiPage',
  },
}));

const createTransaction = patches => patches.reduce((tx, patch) => {
  // Remove document from 'suitepage' type
  tx = tx.delete(patch.id);
  // Add document with new type
  return tx.create(patch.create);
}, client.transaction());

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);

  if (patches.length === 0) {
    console.log('No documents to migrate!');
    return null;
  }
  console.log(
    'Migrating batch:\n%s',
    patches.map(patch => `${patch.id} => ${JSON.stringify({ _type: patch.create._type, title: patch.create.title })}`).join('\n'),
  );
  const transaction = createTransaction(patches);
  await transaction.commit();
  return null;
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
