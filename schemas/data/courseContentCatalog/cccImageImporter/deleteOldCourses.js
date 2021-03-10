// eslint-disable-next-line import/no-extraneous-dependencies
const sanityClient = require('@sanity/client');
// eslint-disable-next-line import/no-unresolved
const sanityJson = require('../../../../sanity.json');
const sanityWriteToken = require('./sanityWriteToken.json');

// specify dataset here so we're super sure we're not accidentally modifying prod
const cccDataset = 'jam--prod';
const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: cccDataset,
  token: sanityWriteToken.token,
});

// get list of all the courses with no thumbnail filenames in Sanity,
// 200 at a time to avoid rate limiting issue
// TODO: refactor this to use this approach with NDJSON: https://www.sanity.io/docs/data-store/importing-data
const oldCourseQuery = '*[_type == "course" && _createdAt < "2019-08-21T17:28:56Z"]';
client.delete({
  query: oldCourseQuery,
});
