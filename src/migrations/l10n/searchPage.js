const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const { searchPages, staticTexts } = await client.fetch(`//groq
      {
        "searchPages": *[_type=="searchpage"],
        "staticTexts": *[_type=="staticText"]
      }
    `);

    const tx = client.transaction();

    searchPages.forEach((searchPage) => {
      const localizedSearchPage = localize(searchPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizedSearchPage, enabledLocale: 'all' });
    });

    staticTexts.forEach((staticText) => {
      const localizedStaticText = localize(staticText, {
        content: 'localeString',
      });
      tx.createOrReplace(localizedStaticText);
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
