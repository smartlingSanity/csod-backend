/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const sanityClient = require('@sanity/client');
const path = require('path');
const fs = require('fs');
const _ = require('lodash/fp');
const uuidv4 = require('uuid/v4');
const { promisify } = require('util');
const { parse } = require('date-fns/fp');
const sanityJson = require('../../../sanity.json');
const sanityToken = require('../utils/importCsvToken').default;
const { htmlToPortableText } = require('../utils/blockContent');
const { getFirstTextThatMatches } = require('../utils/html');
const { getEmbedCodeForUrl } = require('../utils/video');

const fileExists = promisify(fs.exists);

const { getListFromCsvFile } = require('../utils/csv');

const queue = require('../utils/asyncQueue').default;

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: sanityToken,
  useCdn: false,
});

/*
  Run `npm run import-resources [resourcesFilePath] [logosFolderPath]
  resourcesFilePath: /path/to/partners.csv, represents the absolute path of the csv file
  containing the resources.

  logosFolderPath: /path/to/images/folder, represents the absolute path of the folder
  containing the resources' logo images.

  pdfFolderPath: /path/to/pdf/folder, represents the absolute path of the folder
  containing the resources' pdf documents.
*/

const createResourcePageId = id => encodeURI(`route-resource-page-${id}`);

async function importMarketplacePartners() {
  try {
    const resourcesFilePath = process.argv[2];
    const logosFolderPath = path.resolve(process.argv[3]);
    const pdfFolderPath = path.resolve(process.argv[4]);
    const rawCsvList = await getListFromCsvFile(resourcesFilePath);

    await Promise.all(rawCsvList.map(async ({
      title,
      createdAt,
      slug,
      logo,
      description,
      resourceType,
      file,
      body,
      eventDate,
      eventArchiveLink,
      eventArchiveLinkText,
      relatedIndustries,
      relatedProducts,
      relatedTopics,
      type_machine_name,
      nId,
      video,
    }) => {
      try {
        if (resourceType !== 'Event') {
          const resourceDetailPageRoute = await queue.add(() => client.createOrReplace({
            _id: createResourcePageId(nId),
            _type: 'route',
            routeName: title,
            metaTitle: title,
            metaDescription: description,
            slug: {
              current: encodeURI(slug),
            },
            enabled: true,
          }));

          const resourceTypeRef = await client.fetch(`//groq
            *[_type=="filterItem" && name == "${resourceType}"]{
              "_type": "reference",
              "_ref": _id,
            }[0]
          `);

          if (resourceTypeRef && resourceDetailPageRoute) {
            const resourceDetailPage = {
              _id: encodeURI(`resource-detail-page-${nId}`),
              _type: 'resourceDetailPage',
              resourceType: resourceTypeRef,
              route: {
                _ref: resourceDetailPageRoute._id,
                _type: 'reference',
              },
              title,
              sections: [],
            };
            if (description) {
              resourceDetailPage.sections.push(
                {
                  _type: 'blockContentSection',
                  _key: uuidv4(),
                  content: htmlToPortableText(description),
                },
              );
            }
            if (body) {
              resourceDetailPage.sections.push(
                {
                  _type: 'blockContentSection',
                  _key: uuidv4(),
                  content: htmlToPortableText(body),
                },
              );
            }
            if (eventDate) {
              const date = parse(new Date(), 'MM/dd/yyyy - hh:mma', _.toUpper(eventDate)).toISOString();
              resourceDetailPage.eventDate = date;
            }
            if (eventArchiveLinkText && eventArchiveLink) {
              resourceDetailPage.eventArchiveLink = {
                text: eventArchiveLinkText,
                link: [
                  {
                    _type: 'externalLink',
                    _key: uuidv4(),
                    externalLink: eventArchiveLink,
                  },
                ],
              };
            }
            if (logo) {
              const logoFileName = logo.replace(/public:\/\/assets\//, '');
              const logoFilePath = path.resolve(logosFolderPath, logoFileName);
              if (await fileExists(logoFilePath)) {
                const logoAsset = await queue.add(() => client.assets.upload('image', fs.createReadStream(logoFilePath), {
                  filename: logoFileName,
                }));
                if (logoAsset) {
                  resourceDetailPage.logo = {
                    _type: 'csodImage',
                    alt: '',
                    asset: {
                      _ref: logoAsset._id,
                      _type: 'reference',
                    },
                  };
                }
              }
            }
            if (file) {
              const pdfFilePath = path.resolve(pdfFolderPath, type_machine_name, _.trim(file));
              if (await fileExists(pdfFilePath)) {
                const pdfAsset = await queue.add(() => client.assets.upload('file', fs.createReadStream(pdfFilePath), {
                  filename: _.trim(file),
                }));
                if (pdfAsset) {
                  resourceDetailPage.file = {
                    _type: 'file',
                    alt: '',
                    asset: {
                      _ref: pdfAsset._id,
                      _type: 'reference',
                    },
                  };
                }
              }
            }
            if (video) {
              const getVidyardUrl = _.pipe(
                getFirstTextThatMatches.bind(null, /(?<=id=")(.*?)(?=")/g),
                _.split('_'),
                _.last,
                videoUUID => `https://secure.vidyard.com/organizations/190111/embed_select/${videoUUID}`,
              );

              const getYoutubeUrl = _.pipe(
                getFirstTextThatMatches.bind(null, /(?<=src=")(.*?)(?=")/),
                _.replace('/embed', '/watch?v='),
                _.replace('?feature=oembed', ''),
              );

              const videoUrl = _.cond([[_.includes('vidyard'), getVidyardUrl], [_.includes('youtube'), getYoutubeUrl]])(video);
              resourceDetailPage.video = {
                _type: 'video',
                url: videoUrl,
                embedCode: getEmbedCodeForUrl(videoUrl),
              };
            }
            const filterNamesArray = _.reject(
              _.isEmpty,
              _.concat(
                _.split('|', relatedProducts),
                _.split('|', relatedIndustries),
                _.split('|', relatedTopics),
              ),
            );
            if (!_.isEmpty(filterNamesArray)) {
              const query = `//groq
                *[_type=="filterItem" && name in ${JSON.stringify(filterNamesArray)}]{
                  "_type": "reference",
                  "_ref": _id,
                  "_key": _id
                }`;
              const filterItems = await queue.add(() => client.fetch(query));
              resourceDetailPage.filterItems = filterItems;
            }
            const createdResourceDetailPage = await queue.add(() => client.createOrReplace(resourceDetailPage));
            console.log('created resource detail page', createdResourceDetailPage._id);
          }
        }
      } catch (e) {
        console.log(slug);
        console.error(e);
      }
    }));
    await Promise.all(rawCsvList.map(async ({
      relatedResources,
      nId,
    }) => {
      const pageId = `resource-detail-page-${nId}`;
      if (relatedResources) {
        return client.patch(pageId).set({
          relatedResources: await _.pipe(
            _.split('|'),
            _.map(_.trim),
            JSON.stringify,
            _relatedResources => queue.add(() => client.fetch(`//groq
                *[_type=="resourceDetailPage" && route->slug.current in ${_relatedResources}]{
                  "_type": "reference",
                  "_ref": _id,
                  "_key": _id
                }
              `)),
          )(relatedResources),
        }).commit();
      }
      return null;
    }));
  } catch (err) {
    console.log(err);
  }
}

importMarketplacePartners();
