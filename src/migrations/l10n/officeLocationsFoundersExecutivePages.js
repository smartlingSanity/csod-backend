const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const {
      officeLocationsPages,
      executivePages,
      foundersPages,
      boardOfDirectorsPages,
      officeAddressReferences,
    } = await client.fetch(`//groq 
      {
        "foundersPages" : *[_type=="foundersPage"],
        "executivePages": *[_type=="executivePage"],
        "officeLocationsPages": *[_type=="officeLocationsPage"],
        "boardOfDirectorsPages": *[_type=="boardOfDirectorsPage"],
        "officeAddressReferences": *[_type=="officeAddressReference"]
      }
    `);
    const tx = client.transaction();

    officeLocationsPages.forEach((officeLocationsPage) => {
      const localizeOfficeLocationsPages = localize(
        officeLocationsPage,
        baseStringTypeMap,
      );
      tx.createOrReplace({
        ...localizeOfficeLocationsPages,
        enabledLocale: 'all',
      });
    });

    officeAddressReferences.forEach((officeAddress) => {
      const localizedOfficeAddress = localize(officeAddress, baseStringTypeMap);
      tx.createOrReplace(localizedOfficeAddress);
    });

    foundersPages.forEach((foundersPage) => {
      const localizeFoundersPages = localize(foundersPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizeFoundersPages, enabledLocale: 'all' });
    });

    executivePages.forEach((executivePage) => {
      const localizeExecutivePages = localize(executivePage, baseStringTypeMap);
      tx.createOrReplace({ ...localizeExecutivePages, enabledLocale: 'all' });
    });

    boardOfDirectorsPages.forEach((directorPage) => {
      const localizeDirectorPage = localize(directorPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizeDirectorPage, enabledLocale: 'all' });
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
