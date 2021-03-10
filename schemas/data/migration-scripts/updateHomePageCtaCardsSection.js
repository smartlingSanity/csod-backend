import client from 'part:@sanity/base/client';
import _ from 'lodash';

const fetchDocuments = () =>
  client.fetch(`*[_type == 'homepage']`);

const buildPatches = docs => docs.map(doc => {
  const sectionsBelowBanner = _.get(doc, 'sectionsBelowBanner', []);
  const ctaCardsSections = _.remove(sectionsBelowBanner, section => section._type == 'ctaCardsSection');
  return {
    id: doc._id,
    patch: {
      set: {
        sectionsBelowBanner,
        sections: _.concat(ctaCardsSections, _.get(doc, 'sections', [])),
      },
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    }
  };
});

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction());

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);

  if (patches.length === 0) {
    console.log('No documents to migrate!');
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )
  const transaction = createTransaction(patches);
  await transaction.commit();
  return null;
};

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})
