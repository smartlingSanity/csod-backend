/* eslint-disable import/no-extraneous-dependencies */
const sanityClient = require('@sanity/client');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
const _ = require('lodash/fp');
const cheerio = require('cheerio');
const { promisify } = require('util');
const sanityJson = require('../../../sanity.json');
const sanityToken = require('../utils/importCsvToken').default;
const sectionsParser = require('../utils/sections');

const fileExists = promisify(fs.exists);

const { getListFromCsvFile } = require('../utils/csv');

const queue = require('../utils/asyncQueue').default;

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: sanityToken,
});

const createFilterSegments = async (segmentName, partners) => {
  const segmentSet = new Set();
  partners.forEach((partner) => {
    partner[segmentName]
      .split('|')
      .filter(_.negate(_.isEmpty))
      .forEach((segment) => {
        segmentSet.add(segment.trim());
      });
  });
  const createdSegments = await Promise.all(
    Array.from(segmentSet).map(name => queue.add(() => client.createOrReplace({
      _id: `${segmentName}-${_.kebabCase(name)}`,
      _type: segmentName,
      name,
    }))),
  );
  return createdSegments;
};

/*
  Run `npm run import-marketplace-partners [partnersFilePath] [logosFolderPath] [sectionsFilePath]
  partnersFilePath: /path/to/partners.csv, represents the absolute path of the csv file
  containing the marketplace partners.

  logosFolderPath: /path/to/images/folder, represents the absolute path of the folder
  containing the marketplace partners' logo images.
*/
async function importMarketplacePartners() {
  try {
    const partnersFilePath = process.argv[2];
    const logosFolderPath = path.resolve(process.argv[3]);
    const rawCsvList = await getListFromCsvFile(partnersFilePath);
    const [
      fetchedPartnerTypes,
      fetchedRegions,
      fetchedProductCategories,
      fetchedVerticals,
    ] = await Promise.all([
      createFilterSegments('partnerType', rawCsvList),
      createFilterSegments('region', rawCsvList),
      createFilterSegments('partnerProductCategory', rawCsvList),
      createFilterSegments('partnerVertical', rawCsvList),
    ]);
    /*
      Used to convert values like `Technology, Content` into
      an array of sanity references    */

    const mapStringsToSanityReferences = (sanityDocuments, strings) => _.cond([
      [
        _.negate(_.isEmpty),
        _.pipe(
          _.split('|'),
          _.map(
            _.pipe(
              _.trim,
              string => sanityDocuments.find(document => document.name === string),
              ({ _id }) => ({
                _type: 'reference',
                _ref: _id,
                _key: _id,
              }),
            ),
          ),
        ),
      ],
      [_.isEmpty, () => []],
    ])(strings);

    rawCsvList.forEach(async (rawCsvItem) => {
      try {
        const {
          partnerId,
          name,
          title,
          slug,
          logo,
          description,
          partnerType,
          region,
          partnerVertical,
          partnerProductCategory,
          integrationStatus,
          sections,
        } = rawCsvItem;

        const partnerDetailPageRoute = await queue.add(() => client.createOrReplace({
          _id: `route-partner-page-${_.kebabCase(slug)}`,
          _type: 'route',
          routeName: name,
          metaTitle: name,
          metaDescription: description,
          slug: {
            current: slug,
          },
          enabled: true,
        }));
        const routeRef = {
          _type: 'reference',
          _ref: partnerDetailPageRoute._id,
        };
        console.log('created route', partnerDetailPageRoute._id);

        const contactUsRoute = await queue.add(() => client.createOrReplace({
          _id: `route-contact-us-page-${_.kebabCase(slug)}`,
          _type: 'route',
          routeName: `Contact Us ${name}`,
          metaTitle: 'Contact Us',
          metaDescription: description,
          slug: {
            current: encodeURI(`/contact-us/partner?partner=${name}`),
          },
          enabled: true,
        }));

        const partner = {
          _id: `partner-${_.kebabCase(name)}`,
          _type: 'partner',
          partnerId: parseInt(partnerId, 10),
          description,
          isIntegratedPartner: integrationStatus === 'Integration',
          name,
          title,
          link: {
            text: title,
            link: [
              {
                _key: uuidv4(),
                ...routeRef,
              },
            ],
          },
          partnerTypes: mapStringsToSanityReferences(
            fetchedPartnerTypes,
            partnerType,
          ),
          regions: mapStringsToSanityReferences(fetchedRegions, region),
          productCategories: mapStringsToSanityReferences(
            fetchedProductCategories,
            partnerProductCategory,
          ),
          partnerVerticals: mapStringsToSanityReferences(
            fetchedVerticals,
            partnerVertical,
          ),
        };
        if (logo) {
          const logoFileName = logo.replace(/public:\/\//, '');
          const logoFilePath = path.resolve(logosFolderPath, logoFileName);
          if (await fileExists(logoFilePath)) {
            const logoAsset = await queue.add(() => client.assets.upload('image', fs.createReadStream(logoFilePath), {
              filename: logoFileName,
            }));
            partner.logo = {
              _type: 'csodImage',
              alt: name,
              asset: {
                _ref: logoAsset._id,
                _type: 'reference',
              },
            };
          }
        }
        const createdPartner = await queue.add(() => client.createOrReplace(partner));
        console.log('created partner', createdPartner._id);

        /* Converts sections csv to sanity objects   */
        const pageSections = _.reject(
          _.isEmpty,
          await Promise.all(
            _.pipe(
              _.split('\n,'),
              _.map(
                _.pipe(_.trim, async (section) => {
                  const $ = cheerio.load(section);
                  const sectionClass = $('.paragraph-bundle').attr('class');
                  const {
                    convertHeroBannerHtmlToSanity,
                    convertHeadingBannerHtmlToSanity,
                    convertFullTopUIHtmlToSanity,
                    convertAssetDownloadHtmlToSanity,
                    convertCategoryRowHtmlToSanity,
                    convertSplitWithImageHtmlToSanity,
                    convertCarouselHtmlToSanity,
                    convertIconRowHtmlToSanity,
                  } = sectionsParser(partner);
                  if (sectionClass) {
                    if (sectionClass.includes('hero-banner')) {
                      return convertHeroBannerHtmlToSanity($);
                    }
                    if (sectionClass.includes('heading-banner')) {
                      return convertHeadingBannerHtmlToSanity($);
                    }
                    if (sectionClass.includes('full-top-ui')) {
                      return convertFullTopUIHtmlToSanity($);
                    }
                    if (sectionClass.includes('category-row')) {
                      return convertCategoryRowHtmlToSanity($);
                    }
                    if (sectionClass.includes('asset-download')) {
                      return convertAssetDownloadHtmlToSanity($);
                    }
                    if (sectionClass.includes('split-with-image')) {
                      return convertSplitWithImageHtmlToSanity($);
                    }
                    if (sectionClass.includes('carousel')) {
                      return convertCarouselHtmlToSanity($);
                    }
                    if (sectionClass.includes('paragraph-bundle__icon-row')) {
                      return convertIconRowHtmlToSanity($);
                    }
                  }
                  return null;
                }),
              ),
            )(sections),
          ),
        );

        /* Moves buttons in hero banner to heading banner (oneColumnSection below hero banner) */
        const slantBannerCtaButtons = _.pipe(
          _.find(({ _type }) => _type === 'slantBanner'),
          _.getOr([], 'textBlock.button'),
        )(pageSections);
        if (!_.isEmpty(slantBannerCtaButtons)) {
          pageSections[1].textBlock.button = slantBannerCtaButtons;
          pageSections[0].textBlock.button = [];
        }

        const partnerDetailPage = await queue.add(async () => client.createOrReplace({
          _id: `imported-partner-detail-page-${_.kebabCase(name)}`,
          _type: 'partnerDetailPage',
          title: createdPartner.name,
          route: routeRef,
          bubbleCta: {
            _type: 'bubbleCtaReference1',
            button: {
              _type: 'button',
              color: 'accent',
              link: {
                _type: 'link',
                link: [
                  {
                    _key: contactUsRoute._id,
                    _ref: contactUsRoute._id,
                    _type: 'reference',
                  },
                ],
                text: 'get in touch',
              },
              text: 'get in touch',
            },
            heading: 'Interested in this partnership?',
            text: 'We\'ll put you in touch with the right people',
          },
          partner: {
            _type: 'reference',
            _ref: createdPartner._id,
          },
          sections: pageSections,
        }));
        console.log('created partner detail page', partnerDetailPage._id);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

importMarketplacePartners();
