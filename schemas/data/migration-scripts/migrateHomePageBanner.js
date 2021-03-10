// eslint-disable
import client from 'part:@sanity/base/client';

const fs = require('fs');
const queue = require('../utils/asyncQueue').default;

// Run this script with: `sanity exec --with-user-token schemas/data/migrateHomePageBanner.js` in /backend

// HomePageBanner has already been updated on all international datasets, so just use this as a reference

async function migrateHomePageBanner() {
  // Images are not stored in the repo
  const backgroundImage = await queue.add(() => client.assets.upload('image', fs.createReadStream('../../homepageMigrationImages/background.jpg'), {
    filename: 'homepagebanner-background.jpg',
  }));
  const tile1Image = await queue.add(() => client.assets.upload('image', fs.createReadStream('../../homepageMigrationImages/tile1.jpg'), {
    filename: 'tile1.jpg',
  }));
  const tile2Image = await queue.add(() => client.assets.upload('image', fs.createReadStream('../../homepageMigrationImages/tile2.png'), {
    filename: 'tile2.png',
  }));
  const tile3Image = await queue.add(() => client.assets.upload('image', fs.createReadStream('../../homepageMigrationImages/tile3.png'), {
    filename: 'tile3.png',
  }));
  const leftImage = await queue.add(() => client.assets.upload('image', fs.createReadStream('../../homepageMigrationImages/left.png'), {
    filename: 'unbound-resources.png',
  }));

  client
    .patch('70baf645-a041-4698-90d3-172fb72a2037')
    .set({
      homePageBanner: {
        _type: 'homePageBanner',
        align: 'left',
        backgroundImage: { _type: 'csodImage', alt: 'background image', asset: { _ref: backgroundImage._id, _type: 'reference' } },
        buttons: [{
          _key: '78f1ad2322f0', _type: 'button', color: 'accent', link: { _type: 'link', link: [{ _key: '1d457628a765', _ref: '3001e69b-7a32-49cb-9011-4ca000f2c096', _type: 'reference' }] }, text: 'learning solutions',
        }],
        description: 'Today looks nothing like yesterday. Cornerstone helps people and their organization adapt and navigate the new normal.',
        heading: 'Always Learning',
      },
      sectionsBelowBanner: [{
        _key: 'c58876b2d813',
        _type: 'tilesSection',
        tiles: [{
          _key: 'ea5cf37401bf', _type: 'linkTile', heading: 'Access free essential training to help you navigate these challenging times.', link: { _type: 'link', link: [{ _key: '7b265a8251b7', _type: 'externalLink', externalLink: 'https://hr.cornerstoneondemand.com/cornerstonecares' }] }, subheading: 'COVID-19 Public Training', tileImage: { _type: 'csodImage', alt: 'training', asset: { _ref: tile1Image._id, _type: 'reference' } },
        }, {
          _key: '392cc9807df6', _type: 'linkTile', heading: 'A guidebook to help your org thrive in the COVID-era and beyond.', link: { _type: 'link', link: [{ _key: '135b6bd2fa6e', _type: 'externalLink', externalLink: 'https://hr.cornerstoneondemand.com/csod-help-your-org-thrive-in-covid-era-guide' }] }, subheading: 'Unbound Guide', tileImage: { _type: 'csodImage', alt: 'unbound', asset: { _ref: tile2Image._id, _type: 'reference' } },
        }, {
          _key: '1ea3c7dc6fe9', _type: 'linkTile', heading: 'Help your employees adjust to working from home and manage their well-being.', link: { _type: 'link', link: [{ _key: '9bad1ce78936', _type: 'externalLink', externalLink: 'https://hr.cornerstoneondemand.com/RemoteWorkEssentials' }] }, subheading: 'Remote Work Training', tileImage: { _type: 'csodImage', alt: 'remote work', asset: { _ref: tile3Image._id, _type: 'reference' } },
        }],
        useShortTiles: true,
      }],
      twoColumnSection: [{
        _key: '1a9f9b8d5eb4',
        _type: 'twoColumnSection',
        leftBlock: {
          _type: 'column',
          columnBlocks: [{
            _key: '2882bb70e1aa', _type: 'csodImage', alt: 'unbound resources image', asset: { _ref: leftImage._id, _type: 'reference' },
          }],
        },
        rightBlock: {
          _type: 'column',
          columnBlocks: [{
            _key: '91726b77572d',
            _type: 'textBlock',
            align: 'left',
            button: [{
              _key: 'e7a5a82d6c40', _type: 'button', color: 'gray', link: { _type: 'link', link: [{ _key: '803eaa7a78d8', _type: 'externalLink', externalLink: 'https://hr.cornerstoneondemand.com/unbound?utm_campaign=csod-unbound&utm_medium=website&utm_source=internal&utm_content=homepage' }], text: 'get started' }, text: 'get started',
            }],
            description: 'Sharing information to help employers adapt, stay informed, and build their workplace strategy now and beyond this crisis.',
            descriptionColor: 'gray',
            headingText: 'Unbound Resources',
            headingTextColor: 'darkGray',
          }],
        },
      }],
    })
    .commit()
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

migrateHomePageBanner();
