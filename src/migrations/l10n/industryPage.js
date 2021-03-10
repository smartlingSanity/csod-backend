const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const {
      industryPages,
      industryRecognitionPages,
    } = await client.fetch(`//groq
    {
      "industryPages": *[_type == "industrypage"],
      "industryRecognitionPages": *[_type == "industryRecognitionPage"]
    }
    `);

    const tx = client.transaction();

    industryPages.forEach((industryPage) => {
      const localizedIndustryPages = localize(industryPage, {
        ...baseStringTypeMap,
        tagBarText: 'localeString',
        tagBarButtonText: 'localeString',
      });
      tx.createOrReplace({ ...localizedIndustryPages, enabledLocale: 'all' });
    });

    industryRecognitionPages.forEach((industryRecognitionPage) => {
      const localizedIndustryRecognitionPage = localize(
        industryRecognitionPage,
        { ...baseStringTypeMap, awardType: 'localeString' },
      );
      tx.createOrReplace({
        ...localizedIndustryRecognitionPage,
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
