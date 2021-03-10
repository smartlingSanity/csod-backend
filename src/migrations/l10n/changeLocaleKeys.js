const client = require('part:@sanity/base/client');
const chunk = require('lodash/fp/chunk');
const groq = require('groq');
const { replaceLocaleKey } = require('./utils');

const OLD_KEY = 'ap-en';
const NEW_KEY = 'apEn';

function* chunkGenerator(chunks) {
  for (const chunk of chunks) {
    yield chunk;
  }
}

async function run() {
  try {
    const query = groq`*[!(_type match "system.*")]`;
    const documents = await client.fetch(query);
    const documentChunks = chunk(30, documents);
    const chunksIterator = chunkGenerator(documentChunks);
    const processChunk = (chunkItem) => {
      if (chunkItem.done) {
        return;
      }
      const tx = client.transaction();
      chunkItem.value.forEach((document) => {
        const transformedDocument = replaceLocaleKey(
          OLD_KEY,
          NEW_KEY,
          document,
        );
        if (transformedDocument._type === 'userEntity') {
          transformedDocument.userEntityLocales = transformedDocument.userEntityLocales.map(
            locale => (locale === OLD_KEY ? NEW_KEY : locale),
          );
        }
        if (transformedDocument.enabledLocale) {
          transformedDocument.enabledLocale = transformedDocument.enabledLocale === OLD_KEY
            ? NEW_KEY
            : transformedDocument.enabledLocale;
        }
        tx.createOrReplace(transformedDocument);
      });
      tx.commit()
        .then((result) => {
          console.log(result);
          processChunk(chunksIterator.next());
        })
        .catch((error) => {
          console.log(error);
        });
    };
    processChunk(chunksIterator.next());
  } catch (error) {
    console.log(error);
  }
}

run();
