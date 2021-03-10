const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const homePages = await client.fetch(`//groq
      *[_type=="homepage"]
    `);

    const tx = homePages.reduce((_tx, route) => {
      const localizedHomePage = localize(route, baseStringTypeMap);
      _tx.createOrReplace({ ...localizedHomePage, enabledLocale: 'all' });
      return _tx;
    }, client.transaction());

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
