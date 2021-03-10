const client = require('part:@sanity/base/client');
const {
  getOr, omit, pipe, map, chunk, reduce,
} = require('lodash/fp');
const { localize, baseStringTypeMap, createLocaleKeys } = require('./utils');

async function run() {
  try {
    const {
      companyDescriptions,
      newsCoverages,
      newsCoveragesPages,
      newsRoomPages,
      pressContacts,
      pressReleasePages,
    } = await client.fetch(`//groq
      {  
        "companyDescriptions": *[_type=="companyDescription"],
        "newsCoverages": *[_type=="newsCoverage"],
        "newsCoveragesPages": *[_type=="newsCoveragesPage"],
        "newsRoomPages": *[_type=="newsRoomPage"],
        "pressContacts": *[_type=="pressContact"],
        "pressReleasePages": *[_type=="pressReleasePage"],
      }
    `);

    const tx = client.transaction();

    companyDescriptions.forEach((companyDescription) => {
      const localizedCompanyDescription = localize(companyDescription, {
        ...baseStringTypeMap,
      });
      tx.createOrReplace(localizedCompanyDescription);
    });

    newsRoomPages.forEach((newsRoomPage) => {
      const localizedNewsRoomPage = localize(newsRoomPage, {
        ...baseStringTypeMap,
        allNewsCoveragesTitle: 'localeString',
        allPressReleasesTitle: 'localeString',
        analystReportsTitle: 'localeString',
        awardsRecognitionTitle: 'localeString',
        companyName: 'localeString',
        linksTitle: 'localeString',
        newsCoverageTitle: 'localeString',
        pressReleasesTitle: 'localeString',
      });
      tx.createOrReplace({
        ...localizedNewsRoomPage,
        enabledLocale: 'all',
        featuredNewsCoverages: newsRoomPage.featuredNewsCoverages.map((fnc) => {
          const value = omit(['_key'], fnc);
          if (fnc.us) {
            return fnc;
          }

          return {
            _key: fnc._key,
            ...createLocaleKeys('localeNewsCoverageReference', value),
          };
        }),
        awardsRecognition: newsRoomPage.awardsRecognition.map((award) => {
          if (award.newsCoverage.us) {
            return award;
          }

          return {
            ...award,
            companyName: createLocaleKeys('localeString', award.companyName),
            newsCoverage: createLocaleKeys(
              'localeNewsCoverageReference',
              award.newsCoverage,
            ),
          };
        }),
      });
    });

    newsCoverages.forEach((newsCoverage) => {
      const newsCoverageLink = getOr(
        '',
        'link.link.0.externalLink',
        newsCoverage,
      );
      if (newsCoverageLink) {
        const linkPatch = client.patch(newsCoverage._id).set({
          link: newsCoverageLink,
          enabledLocale: 'us',
        });
        tx.patch(linkPatch);
      }
    });

    newsCoveragesPages.forEach((newsCoveragesPage) => {
      const localizedNewsCoveragesPage = localize(newsCoveragesPage, {
        ...baseStringTypeMap,
      });
      tx.createOrReplace({
        ...localizedNewsCoveragesPage,
        enabledLocale: 'all',
      });
    });

    pressContacts.forEach((pressContact) => {
      const localizedPressContact = localize(pressContact, {
        title: 'localeString',
        name: 'localeString',
        email: 'localeString',
        phone: 'localeString',
      });
      tx.createOrReplace(localizedPressContact);
    });

    const pressReleaseTransactions = pipe(
      chunk(30),
      map(_pressReleasePages => reduce(
        (_tx, pressReleasePage) => {
          const localizedPressReleasePage = localize(pressReleasePage, {
            ...baseStringTypeMap,
          });
          _tx.createOrReplace({
            ...localizedPressReleasePage,
            enabledLocale: 'all',
          });
          return _tx;
        },
        client.transaction(),
        _pressReleasePages,
      )),
    )(pressReleasePages);

    const result = await Promise.all(
      [tx, ...pressReleaseTransactions].map(_tx => _tx.commit()),
    );

    console.log(result);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
