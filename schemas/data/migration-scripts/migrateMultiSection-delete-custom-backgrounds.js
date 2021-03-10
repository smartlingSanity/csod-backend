// For branch ft/8827-refactor-multisection-2
// Run this script with:
// `sanity exec --with-user-token migrateMultiSection-delete-custom-backgrounds.js`


// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client';

console.log(`Dataset: ${client.config().dataset}`);

const fetchDocuments = () => client.fetch(
  '*[_type == "customBackground"][0..100]',
);

const deleteCustomBackgrounds = docs => docs.forEach((doc) => {
  client
    .transaction()
    .delete(doc._id)
    .commit()
    .then(() => {
      console.log(`Deleted Custom Background with document: ${doc._id}`);
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    });
});


const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  deleteCustomBackgrounds(documents);

  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
