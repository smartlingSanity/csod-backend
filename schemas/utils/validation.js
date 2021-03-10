// eslint-disable-next-line import/no-unresolved
import _ from 'lodash/fp';
import languageFilterConfig from '../../config/languageFilterConfig';
import { getDocumentEnabledLocale } from './index';

const getMissingLocales = value => languageFilterConfig.supportedLanguages.filter(
  language => _.isEmpty(value[language.id]),
);

const checkMissingLocales = (value) => {
  const missingLocales = getMissingLocales(value);
  if (_.isEmpty(missingLocales)) {
    return true;
  }

  return {
    message: 'Required',
    paths: missingLocales.map(missingLocale => [missingLocale.id]),
  };
};

const requiredByLocale = (value, context) => {
  const fieldType = value._type;
  const { path, document } = context;
  if (/^locale[A-Z]/.test(fieldType)) {
    const enabledLocale = getDocumentEnabledLocale(document);

    if (enabledLocale === 'all') {
      return checkMissingLocales(value);
    }

    if (_.isEmpty(value[enabledLocale])) {
      return {
        message: 'Required',
        paths: [enabledLocale],
      };
    }
    return true;
  }

  return {
    message: 'This is not a localized field',
    paths: path,
  };
};

export default {
  requiredByLocale,
  getMissingLocales,
};
