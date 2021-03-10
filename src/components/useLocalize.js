import { useMemo } from 'react';
import isObject from 'lodash/fp/isObject';
import languageFilterConfig from '../../config/languageFilterConfig';

const { supportedLanguages } = languageFilterConfig;

const validLocales = supportedLanguages.map(l => l.id);

const defaultLocale = languageFilterConfig.supportedLanguages.find(
  l => l.isDefault,
);

const isLocaleObject = x => isObject(x) && x._type && (/^locale[A-Z]/).test(x._type);

/**
 * Given a locale id (e.g. `"ap"` or `"us"`) and returns a function which will crawl a document and
 * try to find an apropriate value to return to represent that object (e.g. in a preview)
 *
 * If a value for the locale is not found, it will fallback to the default locale's value (set in
 * the config); if that value is invalid, it will use the first value for a valid locale it finds
 * in the object.
 */
export const createLocaleTextGetter = (localeCode) => {
  const localize = (value) => {
    if (isLocaleObject(value)) {
      const localizedValue = value[localeCode];
      const defaultValue = value[defaultLocale];
      const fallbackKey = Object.keys(value).filter(k => validLocales.includes(k) && value[k])[0];

      if (localizedValue) return localizedValue;
      if (defaultValue) return defaultValue;
      return value[fallbackKey];
    }

    if (Array.isArray(value)) {
      return value.map(localize);
    }

    if (isObject(value)) {
      return Object.keys(value).reduce(
        (result, key) => ({ ...result, [key]: localize(value[key]) }),
        {},
      );
    }
    return value;
  };
  return localize;
};

export default function useLocalize(data, locale) {
  const localizedData = useMemo(() => {
    const localize = createLocaleTextGetter(locale);
    return localize(data);
  }, [data, locale]);
  return localizedData;
}
