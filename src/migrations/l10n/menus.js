const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  const { menus, footerMenus, globalMenus } = await client.fetch(`//groq
    {
      "menus": *[_type == "menu"],
      "footerMenus": *[_type == "footerMenu"],
      "globalMenus": *[_type == "globalMenu"]
    }
  `);

  const tx = client.transaction();

  menus.forEach((menu) => {
    const localizedMenu = localize(menu, {
      ...baseStringTypeMap,
      groupHeading: 'localeString',
      menuDrawerName: 'localeString',
      quoteText: 'localeString',
      sectionName: 'localeString',
    });
    tx.createOrReplace(localizedMenu);
  });

  footerMenus.forEach((footerMenu) => {
    const localizedFooterMenu = localize(footerMenu, {
      ...baseStringTypeMap,
      description: 'localeString',
      placeholder: 'localeString',
      textLabel: 'localeString',
    });
    tx.createOrReplace(localizedFooterMenu);
  });

  globalMenus.forEach((globalMenu) => {
    const localizedGlobalMenu = localize(globalMenu, {
      ...baseStringTypeMap,
    });
    tx.createOrReplace(localizedGlobalMenu);
  });

  const transactionResult = await tx.commit();
  console.log(transactionResult);
}

run();
