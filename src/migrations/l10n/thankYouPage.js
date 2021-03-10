const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const thankYouPages = await client.fetch(`//groq
      *[_type=="thankYouPage"]
    `);

    const tx = client.transaction();
    thankYouPages.forEach((thankYouPage) => {
      const localizeThankYouPage = localize(thankYouPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizeThankYouPage, enabledLocale: 'all' });
    });
    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
