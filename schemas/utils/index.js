/* eslint-disable import/no-unresolved */
import _ from 'lodash/fp';
import _slugify from 'slugify';
import Cookie from 'js-cookie';
import { createLocaleTextGetter } from '../../src/components/useLocalize';
import User from './user';
import { USER_COOKIE_KEY } from '../../src/components/useUserInfo';

export const slugify = _.curry((options, text) => _slugify(text, options))({
  lower: true,
  strict: true,
  remove: /[*+~.()'"!:@?#=]/g,
});

const PROD_URL = 'https://cornerstoneondemand.com';

export const sanitizeSlug = (slug) => {
  if (slug) {
    const url = new URL(`${PROD_URL}${slug}`);
    let _slug = `${url.pathname}`;
    if (!_.startsWith('/', _slug)) {
      _slug = `/${_slug}`;
    }
    if (!_.endsWith('/', _slug)) {
      _slug = `${_slug}/`;
    }
    _slug = _slug.split('/').map(slugify).join('/');
    return _slug + url.search + url.hash;
  }
  return '';
};

export const getDocumentEnabledLocale = (document) => {
  if (document) {
    const { enabledLocale } = document;
    if (enabledLocale) {
      return enabledLocale;
    }
    return 'all';
  }
  return null;
};

export function localizePreview(prepareFn) {
  try {
    const userCookie = Cookie.get(USER_COOKIE_KEY);
    const parsedCookie = typeof userCookie !== 'undefined' && JSON.parse(userCookie);
    const user = new User(parsedCookie.id, parsedCookie.enabledLocales);

    const localize = createLocaleTextGetter(user.getDominantLocale());
    return _.pipe(localize, prepareFn);
  } catch (error) {
    return prepareFn;
  }
}
