import client from 'part:@sanity/base/client';

// Run this script with: `sanity exec --with-user-token src/migrations/updateNewsRoomPageBannerToCsodColumn.js`
//
// This migrates the newsRoomPage Banner with either rightBlock or leftBlock with _type == 'column' to 'csodColumn' (to avoid issue with datatables)
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

const fetchDocuments = () => client.fetch(
  '*[_type == \'newsRoomPage\'][0...100] {_id, _type, _rev, banner}',
);

const buildPatches = docs => docs.reduce((acc, doc) => {
  let current = {};

  const { banner } = doc;
  const newBanner = JSON.parse(JSON.stringify(banner));

  if (newBanner && newBanner._type === 'twoColumnSection') {
    if (newBanner.leftBlock && newBanner.leftBlock._type === 'column') {
      newBanner.leftBlock._type = 'csodColumn';
    }

    if (newBanner.rightBlock && newBanner.rightBlock._type === 'column') {
      newBanner.rightBlock._type = 'csodColumn';
    }

    if (
      banner.rightBlock._type !== newBanner.rightBlock._type
        || banner.leftBlock._type !== newBanner.leftBlock._type
    ) {
      current = {
        id: doc._id,
        patch: {
          set: { banner: newBanner },
          ifRevisionID: doc._rev,
        },
      };
      acc.push(current);
    }
  }

  return acc;
}, []);

const createTransaction = patches => patches.reduce(
  (tx, patch) => tx.patch(patch.id, patch.patch),
  client.transaction(),
);

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);

  if (patches.length === 0) {
    console.log('No documents to migrate!');
    return null;
  }
  console.log(
    'Migrating batch:\n %s',
    patches
      .map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join('\n'),
  );
  const transaction = createTransaction(patches);
  await transaction.commit();
  return null;
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
