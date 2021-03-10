const sanityClient = require('@sanity/client');
const sanityJson = require('../../../sanity.json');
require('dotenv').config();

// specify dataset here so we're super sure we're not accidentally modifying prod
const accessControlDataset = ['your-dataset-here'];

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: accessControlDataset,
  token: process.env.SANITY_STUDIO_ACCESS_CONTROL_TOKEN,
});

const newsAndPressEditors = {
  key: 'newsAndPressEditors',
  members: ['p5pkQKDeo', 'pQ3Nfn9Zp'], // User ids
};

function createGroupDoc(group) {
  return {
    _id: `_.groups.${group.key}`,
    _type: 'system.group',
    grants: [
      {
        filter: "_type == 'route'",
        permissions: ['read', 'update', 'create'],
      },
      {
        filter: "_type == 'newsRoomPage'",
        permissions: ['read', 'update', 'create'],
      },
      {
        filter: "_type == 'newsCoverage'",
        permissions: ['read', 'update', 'create'],
      },
      {
        filter: "_type == 'newsCoveragesPage'",
        permissions: ['read', 'update', 'create'],
      },
      {
        filter: "_type == 'pressReleasePage'",
        permissions: ['read', 'update', 'create'],
      },
      {
        filter: "_type == 'system.group'",
        permissions: ['read', 'update', 'create'],
      },
    ],
    members: group.members,
  };
}

function createOrReplaceGroup(groupDoc) {
  client.createOrReplace(groupDoc).then((res) => {
    console.log(`Created or replaced system group ${res._id}`);
  });
}

// Create editors
createOrReplaceGroup(createGroupDoc(newsAndPressEditors));
