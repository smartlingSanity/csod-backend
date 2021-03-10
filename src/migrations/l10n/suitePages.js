const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const { suitePages, suiteBenefitsPages } = await client.fetch(`//groq
    {
      "suitePages": *[_type=="suitepage"],
      "suiteBenefitsPages": *[_type=="suitebenefitspage"]
    }`);

    const tx = client.transaction();
    suitePages.forEach((suitePage) => {
      const localizeSuitePages = localize(suitePage, baseStringTypeMap);
      tx.createOrReplace({ ...localizeSuitePages, enabledLocale: 'all' });
    });

    suiteBenefitsPages.forEach((suiteBenefitPage) => {
      const localizeSuiteBenefitsPage = localize(
        suiteBenefitPage,
        baseStringTypeMap,
      );
      tx.createOrReplace({
        ...localizeSuiteBenefitsPage,
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
