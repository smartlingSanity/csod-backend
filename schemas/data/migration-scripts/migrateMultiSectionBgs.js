// For branch ft/8827-refactor-multisection-2
// Run this script with:
// `sanity exec --with-user-token schemas/data/migration-scripts/migrateMultiSectionBgs.js`


// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client';
import uuidv4 from 'uuid/v4';
// eslint-disable-next-line import/no-unresolved
import cloneDeep from 'lodash.clonedeep';


console.log(`Dataset: ${client.config().dataset}`);

const fetchDocuments = () => client.fetch(
  // step through the multisections by changing [0..9] to [10..19], etc
  '*[sections[]._type == "multiSection"][0..9]',
);

const createCustomBackgrounds = docs => docs.map(doc => doc.sections.filter(section => section._type === 'multiSection')
  .reduce((acc, multiSection, index) => acc.concat({
    _id: uuidv4(),
    _type: 'customBackground',
    backgroundName: `${doc.title} - Multisection ${index + 1}`,
    desktopBgImage: {
      ...cloneDeep(multiSection.backgroundImage),
      _type: 'image',
    },
    desktopStyles: {
      ...cloneDeep(multiSection.sectionStyles),
      _type: 'customBackgroundStyles',
    },
    sourceDocId: doc._id,
    sourceMultiSectionId: multiSection._key,
  }), [])
  .forEach((newCustomBg) => {
    client.createOrReplace(newCustomBg).then((result) => {
      console.log(`Custom Background created, document id is ${result._id}`);
    }).catch((err) => {
      console.log('ERROR: ', err);
      console.log('CustomBackground that caused the error: ', newCustomBg);
    });
  }));


const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  createCustomBackgrounds(documents);
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
