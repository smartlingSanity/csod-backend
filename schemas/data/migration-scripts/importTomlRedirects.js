/* eslint-disable import/no-extraneous-dependencies */
const sanityClient = require('@sanity/client');
const path = require('path');
const url = require('url');
const uuidv4 = require('uuid/v4');
const toml = require('toml');
const concat = require('concat-stream');
const fs = require('fs');
const sanityJson = require('../../../sanity.json');

const client = sanityClient(sanityJson.api);
const { getRouteBySlug } = require('../utils/route')(client);

const getExternalLinkFromUrl = _url => ({
  _type: 'externalLink',
  _key: uuidv4(),
  externalLink: _url,
});

const getRedirectUrl = async (_url) => {
  try {
    if (_url.href && _url.path) {
      const route = await getRouteBySlug(_url.path);
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

const tomlPath = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'frontend',
  'netlify.toml',
);

fs.createReadStream(tomlPath, 'utf8').pipe(
  concat(async (data) => {
    const parsed = toml.parse(data);

    const { redirects } = parsed;

    const tx = client.transaction();
    await Promise.all(redirects.map(async (_redirect) => {
      const fromUrl = url.parse(_redirect.from);
      const toUrl = url.parse(_redirect.to);
      const title = `${fromUrl.path}-${toUrl.path}`;
      const redirect = {
        _id: uuidv4(),
        _type: 'redirect',
        title,
        status: `${_redirect.status}`,
        from: getExternalLinkFromUrl(fromUrl.href),
        to: await getRedirectUrl(toUrl),
      };
      tx.createOrReplace(redirect);
    }));
    await tx.commit();
    console.log('finished import redirects');
  }),
);
