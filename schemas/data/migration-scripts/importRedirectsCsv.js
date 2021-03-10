/**
 *
 * SETUP: specify the dataset in sanity.json. Also, specify a Sanity token with
 * with `write` permissions.
 *
 * USAGE: `node -r esm importRedirectsCsv.js [csv filepath] [deleteall flag]`
 *
 * Protip: if you run just `node -r esm importRedirectsCsv.js` it will tell you
 * what dataset it is running against without executing the rest of the script.
 */

/* eslint-disable import/no-extraneous-dependencies */
const sanityClient = require('@sanity/client');
const url = require('url');
const uuidv4 = require('uuid/v4');
const _ = require('lodash/fp');
const sanityJson = require('../../../sanity.json');
const { getListFromCsvFile } = require('../utils/csv');
const { getSiteUrl } = require('../../../config/intlConfig');

const client = sanityClient(sanityJson.api);
const { getRouteBySlug } = require('../utils/route')(client);

const siteUrl = url.parse(getSiteUrl(sanityJson.api.dataset));

const getExternalLinkFromUrl = _url => ({
  _type: 'externalLink',
  _key: uuidv4(),
  externalLink: _url,
});

const getRedirectUrl = async (_url) => {
  try {
    if (_url.href) {
      let route;
      if (_url.host === siteUrl.host) {
        route = await getRouteBySlug(_url.path);
      }
      return [
        {
          _key: uuidv4(),
          ...(route
            ? { _type: 'reference', _ref: route._id }
            : getExternalLinkFromUrl(_url.href)),
        },
      ];
    }
    throw new Error('Invalid url provided, must be a URL object');
  } catch (error) {
    return Promise.reject(error);
  }
};

async function deleteAllRedirects() {
  console.log('Deleting existing redirects!');
  try {
    const result = await client.delete({ query: '*[_type == "redirect"]' });
    if (result && result.results) {
      console.log(`Deleted ${result.results.length} redirects!`);
    }
  } catch (e) {
    throw new Error(`Error on deleting of the redirects: ${e.message}`);
  }
  console.log('Finish deleting exiting redirects!');
}

async function importRedirects() {
  try {
    const redirectsFilePath = process.argv[2];
    const deleteAllFlag = process.argv[3];

    console.log(`Working on project: '${sanityJson.api.projectId}' and dataset: '${sanityJson.api.dataset}'`);

    if (typeof redirectsFilePath !== 'string' || redirectsFilePath.length === 0) {
      console.info('Please provide the redirects CSV file as a first argument');
      return;
    }

    const rawCsvList = await getListFromCsvFile(redirectsFilePath);
    if (_.isEmpty(rawCsvList)) {
      throw new Error('Redirects CSV file is empty!');
    }
    if (!_.has('from', rawCsvList[0]) || !_.has('to', rawCsvList[0])) {
      throw new Error(
        'CSV file has no proper shape: "from" and "to" columns are required',
      );
    }

    if (deleteAllFlag === '--deleteAll') {
      await deleteAllRedirects();
    }

    const tx = client.transaction();
    await Promise.all(
      rawCsvList.map(async (item) => {
        try {
          const fromUrl = url.parse(item.from);
          const toUrl = url.parse(item.to);
          const title = `${fromUrl.path}-${toUrl.path}`;
          const redirect = {
            _id: uuidv4(),
            _type: 'redirect',
            title,
            status: '301',
            from: getExternalLinkFromUrl(fromUrl.href),
            to: await getRedirectUrl(toUrl),
          };
          tx.createOrReplace(redirect);
          return redirect;
        } catch (e) {
          console.log(e);
          return null;
        }
      }),
    );
    await tx.commit();
    console.log('Finished!');
  } catch (e) {
    console.error(e);
  }
}

importRedirects();
