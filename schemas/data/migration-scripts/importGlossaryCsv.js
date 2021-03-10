const sanityClient = require('@sanity/client');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const sanityJson = require('../../../sanity.json');

const { getListFromCsvFile } = require('../utils/csv');
const { htmlToPortableText } = require('../utils/blockContent');
const { getHtmlChildren, getHtmlAttribute } = require('../utils/html');
const sanityToken = require('../utils/importCsvToken').default;

const pageUtils = require('../utils/page');

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: sanityToken,
});

const { getRouteBySlug, createRouteIfNotExists } = require('../utils/route')(
  client,
);

const glossaryPageUtils = pageUtils('glossaryPage', client);
const glossaryTermPageUtils = pageUtils('glossaryTermPage', client);

async function getLinkFromUrlAndName(url, name) {
  const regexPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  if (regexPattern.test(url)) {
    return { text: name, link: [{ _type: 'externalLink', _key: uuidv4(), externalLink: url }] };
  }
  const route = await getRouteBySlug(url);
  if (_.isEmpty(route)) {
    return {
      text: name,
      link: [
        {
          _type: 'externalLink',
          _key: uuidv4(),
          externalLink: `https://cornerstoneondemand.com${url}`,
        },
      ],
    };
  }
  return {
    link: [
      {
        _key: uuidv4(),
        _type: 'reference',
        _ref: route._id,
      },
    ],
    text: name,
  };
}

const getAnchorText = getHtmlChildren('a');
const getAnchorLink = getHtmlAttribute('href');

function parseRelatedProducts(rawRelatedProducts) {
  if (rawRelatedProducts) {
    if (rawRelatedProducts.includes(',')) {
      return rawRelatedProducts.split(',').map(getAnchorText);
    }
    return [getAnchorText(rawRelatedProducts)];
  }
  return [];
}

const createGlossaryPage = async () => {
  const route = await createRouteIfNotExists({ name: 'Glossary', slug: '/glossary', enabled: true });
  const glossaryPage = {
    _id: uuidv4(),
    _type: 'glossaryPage',
    header: {
      _type: 'header',
      menuColor: 'primary',
    },
    name: 'Glossary Page',
    route: {
      _ref: route._id,
      _type: 'reference',
    },
    sections: [
      {
        _key: uuidv4(),
        _type: 'iconHeadingSection',
        align: 'left',
        headingText: 'Cornerstone Glossary',
        headingTextColor: 'darkGray',
        sectionStyles: {
          _type: 'sectionStyles',
          paddingTop: 'none',
        },
      },
      {
        _key: uuidv4(),
        _type: 'blockContentSection',
        content: [
          {
            _key: uuidv4(),
            _type: 'block',
            children: [
              {
                _key: uuidv4(),
                _type: 'span',
                marks: [],
                text: "Boost your knowledge of Cornerstone OnDemand's talent management product and solutions. Have a better understanding of key terms and concepts about recruiting, learning, performance, onboarding, and HR analytics. Click on any of the links below and learn more about how they can help you build a stronger, more agile workforce that can better respond to marketplace demands!",
              },
            ],
            markDefs: [],
            style: 'normal',
          },
        ],
      },
    ],
  };
  const createdPage = await glossaryPageUtils.createOrUpdatePage(glossaryPage);
  console.log('Glossary Page Created: ', createdPage);
};

/* Run `npm run import-glossary-terms [csvFilePath]` to run this script. */
async function importGlossaryCsv() {
  try {
    /* Creates the maing Glossary page (/glossary) */
    await createGlossaryPage();
    /* csvFilePath represents the absolute path of the csv file with the glossary terms data. */
    const csvFilePath = process.argv[2];
    const rawCsvList = await getListFromCsvFile(csvFilePath);
    rawCsvList.forEach(async (rawCsvItem) => {
      try {
        const name = getAnchorText(rawCsvItem['Term name']);
        const slug = getAnchorLink(rawCsvItem['Term name']);
        const relatedProducts = parseRelatedProducts(
          rawCsvItem['Related Products'],
        );
        const description = rawCsvItem['Term description'];
        const route = await createRouteIfNotExists({ name, slug, enabled: true });
        const relatedLink = await getLinkFromUrlAndName(
          rawCsvItem['CTA link url'],
          rawCsvItem['CTA link text'],
        );
        const page = {
          _id: uuidv4(),
          _type: 'glossaryTermPage',
          name,
          route: {
            _type: 'reference',
            _ref: route._id,
          },
          relatedLink,
          productType: relatedProducts,
          sections: [
            {
              _type: 'blockContentSection',
              _key: uuidv4(),
              content: htmlToPortableText(description),
            },
          ],
        };
        const createdPage = await glossaryTermPageUtils.createOrUpdatePage(page);
        console.log(createdPage);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

importGlossaryCsv();
