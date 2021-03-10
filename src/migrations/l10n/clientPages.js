const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const { clientPages, allClientsPages } = await client.fetch(`//groq 
		{
			"clientPages": *[_type=="clientPage"],
			"allClientsPages": *[_type=="allclientspage"]
		}
    `);

    const tx = client.transaction();

    clientPages.forEach((clientPage) => {
      const localizeClientPages = localize(clientPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizeClientPages, enabledLocale: 'all' });
    });

    allClientsPages.forEach((allClientsPage) => {
      const localizeAllClientsPages = localize(allClientsPage, {
        ...baseStringTypeMap,
        tagBarText: 'localeString',
        tagBarButtonText: 'localeString',
      });
      tx.createOrReplace({ ...localizeAllClientsPages, enabledLocale: 'all' });
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
