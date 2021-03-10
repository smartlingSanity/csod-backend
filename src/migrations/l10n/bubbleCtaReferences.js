
const client = require('part:@sanity/base/client');
const { localize } = require('./utils');

async function run() {
  try {
    const { bubbleCtaReferences } = await client.fetch(`//groq
    { 
      "bubbleCtaReferences": *[_type=="bubbleCtaReference1"],
    }
    `);

    const tx = client.transaction();

    bubbleCtaReferences.forEach((bbCtaRef) => {
      const localizedBbCtaRef = localize(bbCtaRef, {
        externalLink: 'localeString',
        heading: 'localeString',
        text: 'localeString',
      });
      tx.createOrReplace({
        ...localizedBbCtaRef,
        text: {
          ...localizedBbCtaRef.text,
          _type: 'localeText',
        },
      });
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
