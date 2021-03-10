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


// get list of all the thumbnail filenames in Sanity
const query = '*[_type == "course"]';
client.fetch(query).then((courses) => {
  const foundCourses = [];

  fs.readdir(path, (err, items) => {
    const myMatches = [];
    let multiMatchCount = 0;

    for (var i = 0; i < items.length; i++) {
      const matchedCourse = courses.filter(course => course.thumbnailFile === items[i]);

      if (matchedCourse.length > 1) {
        multiMatchCount += matchedCourse.length;
      } else if (matchedCourse.length === 1) {
        foundCourses.push(matchedCourse[0]);
        myMatches.push(matchedCourse[0]);
      }
    }
    console.log('myMatches', myMatches.length);
    console.log('multimatch count', multiMatchCount);
    console.log('total count', myMatches.length + multiMatchCount);
  });
});
