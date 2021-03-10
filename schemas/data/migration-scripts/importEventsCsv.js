
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const sanityClient = require('@sanity/client');
const sanityJson = require('../../../sanity.json');

const fileExists = promisify(fs.exists);

const { getListFromCsvFile } = require('../utils/csv');

const queue = require('../utils/asyncQueue').default;

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: 'skmRM8NuZVK7MUMiBFgwz9wo0Hr1LqDgz2eeVzhlQERxThgSn43SJclT5R9zTfZawAemxhv1PpOVytgfjl91wfNYnzh3YHaRcVht8VlGXG2waHZGD5QPuDlpuXOQjaPZ5w4qVnsGfzHBKYPvDOtOw90KjZUs753XMGcevD0HorRepaqpklEh',
});

console.log(sanityJson.api.projectId);
console.log(sanityJson.api.dataset);

/*
  Run `npm run import-events [csvFilePath] [thumbnailsFolderPath]

  csvFilePath: /path/to/events_and_webinars.csv, represents the absolute path of the csv file
  containing the resources.

  thumbnailFolderPath: /path/to/images/folder, represents the absolute path of the folder
  containing the events' logo images.
*/

async function importEvents() {
  try {
    const eventsCsvFilePath = process.argv[2];
    const eventsThumbnailFolderPath = path.resolve(process.argv[3]);
    const rawCsvList = await getListFromCsvFile(eventsCsvFilePath);

    await Promise.all(rawCsvList.map(async ({
      thumbnail,
      location,
      date,
      title,
      button,
      url,
      nid,
    }) => {
      function getLinkFromUrlAndTitle(link, text, key) {
        return { text, link: [{ _type: 'externalLink', _key: key, externalLink: link }] };
      }
      try {
        const link = getLinkFromUrlAndTitle(url, title, encodeURI(`event-document-link-${nid}`));

        const eventDocument = {
          _id: encodeURI(`event-document-${nid}`),
          _type: 'event',
          title,
          location,
          link,
          eventType: 'event',
        };

        if (date) {
          const isoDate = new Date(date).toISOString();
          eventDocument.eventDate = isoDate;
        }

        if (thumbnail) {
          const thumbnailFileName = thumbnail.replace(/public:\/\//, '');
          const thumbnailFilePath = path.resolve(eventsThumbnailFolderPath, thumbnailFileName);
          if (await fileExists(thumbnailFilePath)) {
            const thumbnailAsset = await queue.add(() => client.assets.upload('image', fs.createReadStream(thumbnailFilePath), {
              filename: thumbnailFileName,
            }));
            if (thumbnailAsset) {
              eventDocument.thumbnail = {
                _type: 'csodImage',
                alt: '',
                asset: {
                  _ref: thumbnailAsset._id,
                  _type: 'reference',
                },
              };
            }
          }
        }
        const createdEventsDocuments = await queue.add(() => client.createOrReplace(eventDocument));
        console.log('successfully imported event', createdEventsDocuments._id);
      } catch (err) {
        console.log(err);
      }
    }));
  } catch (e) {
    console.error(e);
  }
}

importEvents();
