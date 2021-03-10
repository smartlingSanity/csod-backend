const sanityClient = require('@sanity/client');
const sanityJson = require('../../../sanity.json');
require('dotenv').config();

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: process.env.SANITY_STUDIO_ACCESS_CONTROL_TOKEN,
});

console.log(`using dataset: ${sanityJson.api.dataset}`);

const fetch = require('node-fetch');

const getDataFromSanity = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.SANITY_STUDIO_ACCESS_CONTROL_TOKEN}`,
    },
  });
  return await response.json();
};

// query and create an array of available document types
const getAvailableDocumentTypes = async (userId) => {
  const query = `*['${userId}' in members]`;
  const documentsArray = [];
  await client
    .fetch(query)
    .then((accessControlDocuments) => {
      accessControlDocuments.forEach((accessControlDocument) => {
        accessControlDocument.grants.forEach((grant) => {
          // match for anything within the single quotes
          // ie grants : "_type == 'event'" will match event
          const matchBetweenSingleQuotes = /'(.*?)'/g;
          const documentType = grant.filter.match(matchBetweenSingleQuotes).join().replace(/'/g, '');
          if (!documentsArray.includes(documentType)) {
            documentsArray.push(documentType);
          }
        });
      });
    });

  return documentsArray;
};

const showUsersPermissions = async () => {
  try {
    const usersArray = [];
    const fetchUsersUrl = `https://api.sanity.io/v1/projects/${sanityJson.api.projectId}`;
    getDataFromSanity(fetchUsersUrl)
      .then(async (users) => {
        await Promise.all(users.members.map(async (user) => {
          const currentUser = {};
          const fetchUserDetails = `https://api.sanity.io/v1/users/${user.id}`;
          await getDataFromSanity(fetchUserDetails)
            .then((userDetails) => {
              currentUser.name = userDetails.displayName;
            });
          currentUser.id = user.id;
          currentUser.role = user.role;
          if (user.role === 'custom') {
            await getAvailableDocumentTypes(user.id)
              .then((documentsArray) => {
                currentUser.permissions = documentsArray;
              });
          }
          usersArray.push(currentUser);
        }));
        console.log(usersArray);
      });
  } catch (err) {
    console.log(err);
  }
};


showUsersPermissions();
