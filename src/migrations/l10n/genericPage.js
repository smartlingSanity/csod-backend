const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const pages = await client.fetch(`//groq
      *[_type=="page"]
    `);

    const tx = client.transaction();

    pages.forEach((page) => {
      const localizedPage = localize(page, baseStringTypeMap);
      tx.createOrReplace({ ...localizedPage, enabledLocale: 'all' });
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
