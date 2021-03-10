const client = require('part:@sanity/base/client');
const { curry } = require('lodash');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const {
      marketplacePages,
      partnerDetailPages,
      partners,
      partnerTypes,
      partnerVerticals,
      partnerProductCategories,
      regions,
      marketplaceTexts,
    } = await client.fetch(`//groq
      {  
        "marketplacePages": *[_type=="marketplacePage"],
        "partnerDetailPages": *[_type=="partnerDetailPage"],
        "partners": *[_type=="partner"],
        "partnerTypes": *[_type=="partnerType"],
        "partnerVerticals": *[_type=="partnerVertical"],
        "partnerProductCategories": *[_type=="partnerProductCategory"],
        "regions": *[_type=="region"],
        "marketplaceTexts": *[_type=="marketplaceText"],
      }
    `);

    const tx = client.transaction();

    marketplacePages.forEach((marketplacePage) => {
      const localizedMarketplacePage = localize(marketplacePage, {
        ...baseStringTypeMap,
      });
      tx.createOrReplace({ ...localizedMarketplacePage, enabledLocale: 'all' });
    });

    partnerDetailPages.forEach((partnerDetailPage) => {
      let localizedPartnerDetailPage = localize(partnerDetailPage, {
        ...baseStringTypeMap,
      });
      if (localizedPartnerDetailPage.bubbleCta) {
        localizedPartnerDetailPage = {
          ...localizedPartnerDetailPage,
          enabledLocale: 'all',
          bubbleCta: {
            ...localizedPartnerDetailPage.bubbleCta,
            text: {
              ...localizedPartnerDetailPage.bubbleCta.text,
              _type: 'localeText',
            },
          },
        };
      }
      tx.createOrReplace(localizedPartnerDetailPage);
    });

    partners.forEach((partner) => {
      const localizedPartner = localize(partner, {
        ...baseStringTypeMap,
      });
      tx.createOrReplace(localizedPartner);
    });

    const localizeLitemByKey = curry((key, titleItem) => {
      const localizedNameItem = localize(titleItem, {
        [key]: 'localeString',
      });
      tx.createOrReplace(localizedNameItem);
    });

    const localizeNameItem = localizeLitemByKey('name');

    partnerTypes.forEach(localizeNameItem);
    partnerVerticals.forEach(localizeNameItem);
    partnerProductCategories.forEach(localizeNameItem);
    regions.forEach(localizeNameItem);

    const localizeContentItem = localizeLitemByKey('content');

    marketplaceTexts.forEach(localizeContentItem);

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
