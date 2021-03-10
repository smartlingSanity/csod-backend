/* eslint-disable no-plusplus */
const omit = require('lodash/fp/omit');

const createLocaleKeys = (_type, _value) => ({ _type, us: _value, apEn: _value });

const isBlockContent = (array) => {
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      const block = array[i];
      if (block && block._type === 'block') {
        return true;
      }
    }
    return false;
  }
  return false;
};

const baseStringTypeMap = {
  author: 'localeString',
  authorRole: 'localeString',
  authorTitle: 'localeString',
  attribution: 'localeString',
  biography: 'localeText',
  buttonText: 'localeString',
  caption: 'localeString',
  carouselHeading: 'localeString',
  catalogCtaText: 'localeString',
  clientQuote: 'localeText',
  description: 'localeText',
  displayName: 'localeString',
  embedCode: 'localeString',
  externalLink: 'localeUrl',
  footnote: 'localeString',
  heading: 'localeString',
  headingPrefixText: 'localeString',
  headingText: 'localeString',
  jobTitle: 'localeString',
  label: 'localeString',
  metaDescription: 'localeText',
  metaTitle: 'localeString',
  ogDescription: 'localeString',
  ogLocale: 'localeString',
  ogTitle: 'localeString',
  ogType: 'localeString',
  prefixText: 'localeString',
  productsUsed: 'localeString',
  quote: 'localeString',
  quoteAuthor: 'localeString',
  routeName: 'localeString',
  sectionHeading: 'localeString',
  sectionSubHeading: 'localeString',
  statsDescription: 'localeString',
  statsHeading: 'localeString',
  subheading: 'localeString',
  subheadingText: 'localeString',
  subtitle: 'localeString',
  text: 'localeString',
  title: 'localeString',
  twitterCard: 'localeString',
  twitterDescription: 'localeString',
  twitterTitle: 'localeString',
  url: 'localeUrl',
  videoLength: 'localeString',
};

const localize = (value, stringTypeMap) => {
  if (Array.isArray(value)) {
    if (isBlockContent(value)) {
      return createLocaleKeys('localeBlockContent', value);
    }
    return value.map(v => localize(v, stringTypeMap));
  }
  if (typeof value === 'object') {
    if (/^locale/.test(value._type)) {
      return value;
    }
    if (value._type === 'csodImage') {
      return createLocaleKeys('localeCsodImage', value);
    }
    if (value._type === 'file') {
      return createLocaleKeys('localeFile', value);
    }
    return Object.keys(value).reduce((result, key) => {
      if (typeof value[key] === 'string') {
        if (stringTypeMap[key]) {
          return {
            ...result,
            [key]: createLocaleKeys(stringTypeMap[key], value[key]),
          };
        }
      }
      return { ...result, [key]: localize(value[key], stringTypeMap) };
    }, {});
  }
  return value;
};

const replaceLocaleKey = (oldKey, newKey, data) => {
  if (!(oldKey && newKey && data)) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(value => replaceLocaleKey(oldKey, newKey, value));
  }
  if (typeof data === 'object') {
    if (/^locale/.test(data._type)) {
      if (data[oldKey]) {
        return omit([oldKey], {
          ...data,
          [newKey]: data[oldKey],
        });
      }
      return data;
    }
    return Object.keys(data).reduce(
      (result, key) => ({
        ...result,
        [key]: replaceLocaleKey(oldKey, newKey, data[key]),
      }),
      {},
    );
  }
  return data;
};

module.exports = {
  isBlockContent,
  baseStringTypeMap,
  localize,
  createLocaleKeys,
  replaceLocaleKey,
};
