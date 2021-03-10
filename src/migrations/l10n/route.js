const client = require('part:@sanity/base/client');
const { localize } = require('./utils');

async function run() {
  try {
    const routes = await client.fetch(`//groq
      *[_type=="route"]
    `);

    const tx = routes.reduce((_tx, route) => {
      const localizedRoute = localize(route, {
        routeName: 'localeString',
        metaDescription: 'localeText',
        metaTitle: 'localeString',
        metaKeywords: 'localeString',
      });
      _tx.createOrReplace({ ...localizedRoute });
      return _tx;
    }, client.transaction());

    const result = await tx.commit();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
