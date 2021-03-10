const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const cccPages = await client.fetch(`//groq
      *[_type=="cccPage"]
    `);
    const tx = client.transaction();

    cccPages.forEach((cccPage) => {
      const localizedCccPage = localize(cccPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizedCccPage, enabledLocale: 'all' });
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
