import client from 'part:@sanity/base/client';
import _ from 'lodash';

const fetchDocuments = () => client.fetch(`*[_type == 'page' && _id in ['drafts.ac68e0ec-9df5-4fb6-b736-f723d9660db7', 
                            'drafts.c03b0b18-8dbd-40ac-8dc2-a5181fd03b63',
                            'drafts.d566a1d3-dabd-49da-aafd-1e231722161e']]`);

const buildPatches = docs => docs.map((doc) => {
  const sections = _.get(doc, 'sections', []);
  const slantBannerIndex = sections.findIndex(section => section._type === 'slantBanner');
  const newPage = {
    ...doc,
    _id: undefined,
    _type: 'smbPage',
  };

  if (slantBannerIndex >= 0) {
    sections[slantBannerIndex]._type = 'smbSlantBanner';
    newPage.sections = sections;
  }

  delete newPage.scheduledPublishTime;

  return ({
    id: doc._id,
    create: newPage,
  });
});

const createTransaction = patches => patches.reduce((tx, patch) => {
  // Remove document from 'page' type
  tx = tx.delete(patch.id);
  // Add document with new type
  return tx.create(patch.create);
}, client.transaction());

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);

  if (patches.length === 0) {
    console.log('No documents to migrate!');
    return null;
  }
  console.log(
    'Migrating batch:\n%s',
    patches.map(patch => `${patch.id} => ${JSON.stringify({ _type: patch.create._type, title: patch.create.title })}`).join('\n'),
  );
  const transaction = createTransaction(patches);
  await transaction.commit();
  return null;
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
