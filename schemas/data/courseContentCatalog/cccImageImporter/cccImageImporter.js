const sanityClient = require('@sanity/client');
const fs = require('fs');
const sanityJson = require('../../../../sanity.json');
const sanityWriteToken = require('./sanityWriteToken.json');

const { createReadStream } = fs;
const fetch = require('node-fetch');

if (process.argv.length <= 2) {
  console.log(`Usage: ${__filename} path/to/directory`);
  process.exit(-1);
}

// specify dataset here so we're super sure we're not accidentally modifying prod
const cccDataset = 'ericj--6958';
const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: cccDataset,
  token: sanityWriteToken.token,
});

const path = process.argv[2];

// get list of all the courses with no thumbnail filenames in Sanity, 200 at a time to avoid rate limiting issue
// TODO: refactor this to use this approach with NDJSON: https://www.sanity.io/docs/data-store/importing-data
const query = '*[_type == "course" && !defined(thumbnailImage)][0..200]';
client.fetch(query).then((courses) => {
  courses.forEach((course) => {
    const filePath = path + course.thumbnailFile;

    try {
      const thumbnailStream = fs.readFileSync(filePath);
      // todo: try awaiting this function to get the imageAsset and build our patch, or map it
      client.assets.upload('image', thumbnailStream, {}).then((imageAsset) => {
        client
          .patch(course._id)
          .set({
            thumbnailImage: {
              asset: {
                _ref: imageAsset._id,
                _type: 'reference',
              },
            },
          })
          .commit()
          .then((updatedCourse) => {
            console.log('updatedCourse', updatedCourse);
          })
          .catch((err) => {
            console.error('update failed: ', err.message);
          });
      }, (err) => {
        console.error('Image failed: ', err);
      });
    } catch (err) {
      console.log(err);
      return course;
    }

    return course;
  });
}, (err) => {
  console.log(err);
});


// TODO: try to implement this way to avoid rate limiting problem with the above code
// const fetchDocuments = () =>
//   client.fetch(`*[_type == 'course' && !defined(thumbnailImage)][0...100]`)
//
// const buildPatches = docs =>
//   docs.map(doc => ({
//     id: doc._id,
//     patch: {
//       set: {fullname: doc.name},
//       unset: ['name'],
//       // this will cause the transaction to fail if the documents has been
//       // modified since it was fetched.
//       ifRevisionID: doc._rev
//     }
//   }))
//
// const uploadCourseImages = courses => {
//   courses.forEach();
// };
//
//
// const createTransaction = patches =>
//   patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())
//
// const commitTransaction = tx => tx.commit()
//
// const migrateNextBatch = async () => {
//   const documents = await fetchDocuments()
//
//   const patches = buildPatches(documents)
//   if (patches.length === 0) {
//     console.log('No more documents to migrate!')
//     return null
//   }
//   console.log(
//     `Migrating batch:\n %s`,
//     patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
//   )
//   const transaction = createTransaction(patches)
//   await commitTransaction(transaction)
//   return migrateNextBatch()
// }
//
// migrateNextBatch().catch(err => {
//   console.error(err)
//   process.exit(1)
// })
