const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const subscriptionPages = await client.fetch(`//groq
      *[_type=="subscriptionPage"]
    `);
    const tx = client.transaction();
    subscriptionPages.forEach((subscriptionPage) => {
      const localizeSubscriptionPages = localize(
        subscriptionPage,
        baseStringTypeMap,
      );
      tx.createOrReplace({
        ...localizeSubscriptionPages,
        enabledLocale: 'all',
      });
    });
    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
