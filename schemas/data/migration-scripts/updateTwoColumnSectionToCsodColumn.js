import client from 'part:@sanity/base/client';

// Run this script with: `sanity exec --with-user-token src/migrations/updateTwoColumnSectionToCsodColumn.js`
//
// This migrates any document with sections defined that contains a twoColumnSection with either rightBlock or leftBlock with _type == 'column' to 'csodColumn' (to avoid issue with datatables)
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
  '*[defined(sections) && sections[]._type == "twoColumnSection"][0...100] {_id, _type, _rev, sections}',
);

const buildPatches = docs => docs.reduce((acc, doc) => {
  let current = {};

  const twoColumnSectionsWithColumn = doc.sections.filter((sec) => {
    if (sec._type === 'twoColumnSection') {
      if (sec.leftBlock && sec.leftBlock._type === 'column') {
        return true;
      }
      if (sec.rightBlock && sec.rightBlock._type === 'column') {
        return true;
      }
    }
    return false;
  });

  if (twoColumnSectionsWithColumn.length !== 0) {
    const newSections = doc.sections.map((sec) => {
      const newSection = { ...sec };

      if (newSection._type === 'twoColumnSection') {
        if (newSection.leftBlock && newSection.leftBlock._type === 'column') {
          newSection.leftBlock._type = 'csodColumn';
        }

        if (
          newSection.rightBlock
            && newSection.rightBlock._type === 'column'
        ) {
          newSection.rightBlock._type = 'csodColumn';
        }
      }

      return newSection;
    });

    current = {
      id: doc._id,
      patch: {
        set: { sections: newSections },
        ifRevisionID: doc._rev,
      },
    };
    acc.push(current);
  }

  return acc;
}, []);

const createTransaction = patches => patches.reduce(
  (tx, patch) => tx.patch(patch.id, patch.patch),
  client.transaction(),
);

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);

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
