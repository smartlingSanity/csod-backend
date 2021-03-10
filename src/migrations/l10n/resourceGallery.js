const client = require('part:@sanity/base/client');
const { curry } = require('lodash');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const {
      allResourcesPages,
      filterMenus,
      filterDropdowns,
      filterItems,
      resourceDetailPages,
      resourceGalleryTexts,
      shareWidgets,
      socialMedias,
      sortOptions,
    } = await client.fetch(`//groq
      {  
        "allResourcesPages": *[_type=="allResourcesPage"],
        "resourceDetailPages": *[_type=="resourceDetailPage"],
        "filterMenus": *[_type=="filterMenu"],
        "filterDropdowns": *[_type=="filterDropdown"],
        "filterItems": *[_type=="filterItem"],
        "sortOptions": *[_type=="sortOption"],
        "resourceGalleryTexts": *[_type=="resourceGalleryText"],
        "shareWidgets": *[_type=="shareWidget"],
        "socialMedias": *[_type=="socialMedia"],
      }
    `);

    const tx = client.transaction();

    allResourcesPages.forEach((allResourcesPage) => {
      const localizedAllResourcesPage = localize(allResourcesPage, {
        ...baseStringTypeMap,
      });
      tx.createOrReplace({
        ...localizedAllResourcesPage,
        enabledLocale: 'all',
      });
    });

    resourceDetailPages.forEach((resourceDetailPage) => {
      const localizedResourceDetailPage = localize(resourceDetailPage, {
        ...baseStringTypeMap,
      });
      tx.createOrReplace({
        ...localizedResourceDetailPage,
        enabledLocale: 'all',
      });
    });

    resourceGalleryTexts.forEach((resourceGalleryText) => {
      const localizedResourceGalleryText = localize(resourceGalleryText, {
        content: 'localeString',
      });
      tx.createOrReplace(localizedResourceGalleryText);
    });

    filterMenus.forEach((filterMenu) => {
      const localizedFilterMenu = localize(filterMenu, {
        ...baseStringTypeMap,
        closeTitle: 'localeString',
        openTitle: 'localeString',
        clearTitle: 'localeString',
        filterTitle: 'localeString',
        sortTitle: 'localeString',
      });
      tx.createOrReplace(localizedFilterMenu);
    });

    const localizeTitleItem = curry((_tx, titleItem) => {
      const localizedTitleItem = localize(titleItem, {
        title: 'localeString',
      });
      _tx.createOrReplace(localizedTitleItem);
    })(tx);

    filterDropdowns.forEach(localizeTitleItem);
    filterItems.forEach(localizeTitleItem);
    sortOptions.forEach(localizeTitleItem);
    shareWidgets.forEach(localizeTitleItem);
    socialMedias.forEach(localizeTitleItem);

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
