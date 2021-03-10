const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const { gtmPages } = await client.fetch(`//groq
    { 
      "gtmPages": *[_type=="gtmPage"],
    }
    `);

    const tx = client.transaction();
    gtmPages.forEach((formPage) => {
      const localizedFormPage = localize(formPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizedFormPage, enabledLocale: 'all' });
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
