/* eslint-disable import/no-extraneous-dependencies */
const sanityClient = require('@sanity/client');
const uuidv4 = require('uuid/v4');
const { parse } = require('date-fns');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const sanityJson = require('../../../sanity.json');
const sanityToken = require('../utils/importCsvToken').default;

const fileExists = promisify(fs.exists);

const { getListFromCsvFile } = require('../utils/csv');

const queue = require('../utils/asyncQueue').default;

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: sanityToken,
});

function getLinkFromUrlAndTitle(url, title) {
  return { text: title, link: [{ _type: 'externalLink', _key: uuidv4(), externalLink: url }] };
}

/* Run `npm run import-news-coverages [csvFilePath] [imagesPath]` */
async function importNewsCoverages() {
  try {
    /* csvFilePath represents the absolute path of the csv file containing the news coverages */
    const csvFilePath = process.argv[2];
    /* imagesPath represents the absolute path of the folder containing the news coverages' images */
    const imagesPath = path.resolve(process.argv[3]);
    const rawCsvList = await getListFromCsvFile(csvFilePath);
    rawCsvList.forEach(async (rawCsvItem) => {
      try {
        const {
          title, url, image, postDate,
        } = rawCsvItem;
        const link = getLinkFromUrlAndTitle(
          url,
          title,
        );
        const newsCoverage = {
          _id: uuidv4(),
          _type: 'newsCoverage',
          title,
          postDate: parse(postDate, 'MMMM dd, yyyy', new Date()).toISOString(),
          link,
        };
        if (image) {
          const imageFileName = image.replace(/public:\/\/(news\/)?/, '');
          const imageFilePath = path.resolve(imagesPath, imageFileName);
          if (await fileExists(imageFilePath)) {
            const imageAsset = await queue.add(() => client.assets.upload('image', fs.createReadStream(imageFilePath), {
              filename: imageFileName,
            }));
            newsCoverage.logo = {
              _type: 'csodImage',
              alt: title,
              asset: {
                _ref: imageAsset._id,
                _type: 'reference',
              },
            };
          }
        }
        const createdNewsCoverage = await queue.add(() => client.createOrReplace(newsCoverage));
        console.log(JSON.stringify(createdNewsCoverage, null, 2));
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

importNewsCoverages();
