const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const { glossaryPages, glossaryTermPages } = await client.fetch(`//groq
    { 
      "glossaryPages": *[_type=="glossaryPage"],
      "glossaryTermPages": *[_type=="glossaryTermPage"],
    }
    `);

    const tx = client.transaction();
    glossaryPages.forEach((glossaryPage) => {
      const localizedGlossaryPage = localize(glossaryPage, {
        ...baseStringTypeMap,
        name: 'localeString',
      });
      tx.createOrReplace({ ...localizedGlossaryPage, enabledLocale: 'all' });
    });

    glossaryTermPages.forEach((glossaryTermPage) => {
      const localizedGlossaryTermPage = localize(glossaryTermPage, {
        ...baseStringTypeMap,
        name: 'localeString',
      });
      tx.createOrReplace({
        ...localizedGlossaryTermPage,
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
