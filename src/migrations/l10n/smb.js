const client = require('part:@sanity/base/client');
const { baseStringTypeMap, localize } = require('./utils');

async function run() {
  try {
    const { smbPages, smbProductPages, allSmbClientsPages } = await client.fetch(`//groq
      {
        "smbPages": *[_type == "smbPage"],
        "allSmbClientsPages": *[_type == "allSmbClientsPage"],
        "smbProductPages": *[_type == "smbProductPage"]
      }
    `);

    const tx = client.transaction();

    smbPages.forEach((smbPage) => {
      const localizedSmbPage = localize(smbPage, {
        ...baseStringTypeMap,
        preTitle: 'localeString',
      });
      tx.createOrReplace({ ...localizedSmbPage, enabledLocale: 'all' });
    });

    smbProductPages.forEach((smbProductPage) => {
      const localizedSmbProductPage = localize(smbProductPage, {
        ...baseStringTypeMap,
        preTitle: 'localeString',
      });
      tx.createOrReplace({ ...localizedSmbProductPage, enabledLocale: 'all' });
    });

    allSmbClientsPages.forEach((allSmbClientsPage) => {
      const localizedAllSmbClientsPage = localize(allSmbClientsPage, {
        ...baseStringTypeMap,
        preTitle: 'localeString',
      });
      tx.createOrReplace({ ...localizedAllSmbClientsPage, enabledLocale: 'all' });
    });

    const result = await tx.commit();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
