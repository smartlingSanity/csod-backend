import client from 'part:@sanity/base/client';

// Run this script with: `sanity exec --with-user-token migrations/renameField.js`
//
// This example shows how you may write a migration script that renames a field (name => fullname)
// on a specific document type (author).
// This will migrate documents in batches of 100 and continue patching until no more documents are
// returned from the query.
//
// This script can safely be run, even if documents are being concurrently modified by others.
// If a document gets modified in the time between fetch => submit patch, this script will fail,
// but can safely be re-run multiple times until it eventually runs out of documents to migrate.

// A few things to note:
// - This script will exit if any of the mutations fail due to a revision mismatch (which means the
//   document was edited between fetch => update)
// - The query must eventually return an empty set, or else this script will continue indefinitely

// Fetching documents that matches the precondition for the migration.
// NOTE: This query should eventually return an empty set of documents to mark the migration
// as complete
const fetchDocuments = () => client.fetch('*[_type == "partnerDetailPage"]{_id,_rev,sections}[0...100]');

const buildPatches = docs => docs.reduce((acc, doc) => {
  let current = {};
  const partnerProductCategories = doc.sections.reduce((acc1, section) => {
    if (section._type === 'productSegmentSection') {
      if (typeof section.categories === 'undefined') return acc1;
      const newProductCategory = section.categories.reduce((array, productCategory) => {
        if (productCategory._key === "productCategory-learning") acc1.push({
          "_key": "ef75e7f55120",
          "_type": "reference",
          "_ref": "eba38c3f-18c8-4c1a-b9f3-2096ae855f60"
        });
        if (productCategory._key === "productCategory-recruiting") acc1.push({
          "_key": "61bb1543dc39",
          "_type": "reference",
          "_ref": "b4b9bd67-1d14-45ef-a54e-00be4902d87c"
        });
        if (productCategory._key === "productCategory-performance") acc1.push({
          "_key": "4e64c7bfb5fd",
          "_type": "reference",
          "_ref": "d670b7ad-2644-4552-b813-5c38a1d1f49d"
        });
        if (productCategory._key === "productCategory-extended-enterprise") acc1.push({
          "_key": "2a9e53e2eb2f",
          "_type": "reference",
          "_ref": "bc786d60-b563-45d8-8acd-f440db2827c1"
        });
        if (productCategory._key === "productCategory-edge") acc1.push({
          "_key": "105f3c792f08",
          "_type": "reference",
          "_ref": "42e613e4-457d-4eca-9b7e-51b16c223a63"
        });
        if (productCategory._key === "productCategory-cfs") acc1.push({
          "_key": "ef75e7f55120",
          "_type": "reference",
          "_ref": "f5a7f068-d13d-42cc-97bf-ab500190a90a"
        });
        if (productCategory._key === "productCategory-hr") acc1.push({
          "_key": "229fcda795db",
          "_type": "reference",
          "_ref": "11ecbd85-8ef9-408f-896e-93147e0104a7"
        });
        return array;
      }, []);
    };
    return acc1;
  }, []);

  if (partnerProductCategories.length > 0) {
    current = {
      id: doc._id,
      patch: {
        set: { 'sections[_type == "productSegmentSection"].partnerProductCategories': partnerProductCategories },
        ifRevisionID: doc._rev,
        unset: ['sections[_type == "productSegmentSection"].categories', 'partnerProductCategories'],
      },
    };
    acc.push(current);
  }
  return acc;
}, []);

const createTransaction = patches => patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction());

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  console.log({ patches });
  if (patches.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }
  console.log(
    'Migrating batch:\n %s',
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
