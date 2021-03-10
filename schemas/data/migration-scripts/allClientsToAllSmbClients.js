import client from 'part:@sanity/base/client';

const fetchDocuments = () =>
  client.fetch(`*[_type == 'allclientspage' && title match 'SMB']`);

const buildPatches = docs => docs.map(doc =>
  ({
    id: doc._id,
    create: {
      ...doc,
      allSmbClientsSlantBanner: {
        ...doc.allClientsSlantBanner,
        _type: 'allSmbClientsSlantBanner',
      },
      allClientsSlantBanner: undefined,
      _id: undefined,
      _type: 'allSmbClientsPage',
    }
  })
);

const createTransaction = patches =>
  patches.reduce((tx, patch) => {
    // Remove document from 'allclientspage' type
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
    `Migrating batch:\n%s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify({ _type: patch.create._type, title: patch.create.title })}`).join('\n')
  );
  const transaction = createTransaction(patches);
  await transaction.commit();
  return null;
};

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})
