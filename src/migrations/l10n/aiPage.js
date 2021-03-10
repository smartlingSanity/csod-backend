const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const aiPages = await client.fetch(`//groq
      *[_type=="aiPage"]
    `);
    const tx = client.transaction();

    aiPages.forEach((aiPage) => {
      const localizedAiPage = localize(aiPage, {
        ...baseStringTypeMap,
        aiBannerHeading: 'localeString',
        aiBannerText: 'localeString',
        dataSectionHeading: 'localeString',
      });
      tx.createOrReplace({ ...localizedAiPage, enabledLocale: 'all' });
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
