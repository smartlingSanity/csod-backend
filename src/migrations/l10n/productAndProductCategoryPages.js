const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const { productPages, productCategoryPages } = await client.fetch(`//groq
		{
			"productPages": *[_type=="productPage"],
			"productCategoryPages": *[_type=="productCategoryPage"]
		}
    `);
    const sharedTypes = {
      ...baseStringTypeMap,
      shortDescription: 'localeText',
    };
    const tx = client.transaction();

    productPages.forEach((productPage) => {
      const localizeProductPage = localize(productPage, sharedTypes);
      tx.createOrReplace({ ...localizeProductPage, enabledLocale: 'all' });
    });

    productCategoryPages.forEach((productCategoryPage) => {
      const localizeProductCategoryPage = localize(
        productCategoryPage,
        sharedTypes,
      );
      tx.createOrReplace({
        ...localizeProductCategoryPage,
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
