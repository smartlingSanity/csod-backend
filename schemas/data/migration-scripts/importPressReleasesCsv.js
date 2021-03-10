const sanityClient = require('@sanity/client');
const uuidv4 = require('uuid/v4');
const { parse } = require('date-fns/fp');
const _ = require('lodash/fp');

const sanityJson = require('../../../sanity.json');
const { getListFromCsvFile } = require('../utils/csv');
const { htmlToPortableText } = require('../utils/blockContent');
const sanityToken = require('../utils/importCsvToken').default;
const queue = require('../utils/asyncQueue').default;

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: sanityToken,
});

const { createRouteIfNotExists } = require('../utils/route')(
  client,
);

const { createOrUpdatePage } = require('../utils/page')(
  'glossaryTermPage',
  client,
);

const getRidOfTextBelowTitleRegex = _.curry((title, body) => body.replace(new RegExp(`(<([a-z]+)>)?${title}(</([a-z]+)>)?.*`,
  's'), ''));

const getRidOfMediaContact = getRidOfTextBelowTitleRegex('Media Contact:');
const getRidOfInvestorRelationsContact = getRidOfTextBelowTitleRegex('Investor Relations Contact:');
const getRidOfCompanyDescription = getRidOfTextBelowTitleRegex('About (\\w*\\s?)+');

/*
  The media contact should be removed first from the raw html,
  so all the content is being removed from bottom to top
*/
const sanitizeBody = _.pipe(
  getRidOfMediaContact,
  getRidOfInvestorRelationsContact,
  getRidOfCompanyDescription,
  _.trim,
);

/* Run `npm run import-press-releases [csvFilePath]` to run this script. */
async function importGlossaryCsv() {
  try {
    /* csvFilePath represents the absolute path of the csv file with the press releases data. */
    const csvFilePath = process.argv[2];
    const rawCsvList = await getListFromCsvFile(csvFilePath);
    const companyDescriptions = [
      await queue.add(() => client.fetch(`//groq
        *[_type=="companyDescription" && name=="Cornerstone OnDemand, Inc."]{
          "_type": 'reference',
          "_key": _id,
          "_ref": _id,
        }[0]
      `)),
    ];
    rawCsvList.forEach(async (rawCsvItem) => {
      try {
        // This is the shape that each csv record must have!
        const {
          slug, postDate, title, body,
        } = rawCsvItem;
        const isInvestorRelease = !_.isEqual(body, getRidOfInvestorRelationsContact(body));
        const route = await createRouteIfNotExists({
          name: title,
          slug,
          enabled: true,
        });
        const page = {
          _id: uuidv4(),
          _type: 'pressReleasePage',
          title,
          postDate: _.pipe(
            _.split(' - '),
            _.first,
            parse(new Date(), 'MM/dd/yyyy'),
          )(postDate).toISOString(),
          isInvestorRelease,
          route: {
            _type: 'reference',
            _ref: route._id,
          },
          companyDescriptions,
          sections: [
            {
              _type: 'blockContentSection',
              _key: uuidv4(),
              content: htmlToPortableText(sanitizeBody(body)),
            },
          ],
        };
        const createdPage = await createOrUpdatePage(page);
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
