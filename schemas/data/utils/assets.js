/* eslint-disable import/no-extraneous-dependencies */
const Axios = require('axios');
const sanityClient = require('@sanity/client');
const sanityJson = require('../../../sanity');
const sanityToken = require('./importCsvToken').default;


const queue = require('./asyncQueue').default;

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: sanityToken,
});

module.exports = {
  /* Creates sanity asset from remote url */
  createSanityAssetFromUrl: async (url, assetType = 'file') => {
    if (url) {
      try {
        const [filename] = url.split('/').slice(-1);
        const response = await queue.add(() => Axios({
          url,
          method: 'GET',
          responseType: 'stream',
          auth: {
            username: 'prettyfly',
            password: 'forawebsite',
          },
        }));
        const asset = await queue.add(() => client.assets.upload(assetType, response.data, {
          filename,
        }));
        return asset;
      } catch (err) {
        console.log(url);
        console.log(err);
        return null;
      }
    }
    return null;
  },
};
