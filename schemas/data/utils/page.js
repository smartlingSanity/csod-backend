/* This module is created to update a page with the same slug, rather than creating a new one.
Sanity will update a document as long as the _id is the same. */

const _ = require('lodash/fp');

const routeUtils = require('./route');

const queue = require('./asyncQueue').default;

module.exports = _.curry((pageType, client) => {
  const { getRouteById } = routeUtils(client);
  const getPageBySlug = async (slug) => {
    const page = await queue.add(() => client.fetch(`//groq
    *[_type=="${pageType}" && route->slug.current == "${slug}"][0]{
      ...
    }`));
    if (_.isEmpty(page)) {
      return null;
    }
    return page;
  };

  const createOrUpdatePage = async (page) => {
    const routeId = _.getOr('', 'route._ref', page);
    const route = await getRouteById(routeId);
    const slug = _.getOr('', 'slug.current', route);
    const existingPage = await getPageBySlug(slug);
    const pageId = existingPage ? existingPage._id : page._id;
    return queue.add(() => client.createOrReplace({ ...page, _id: pageId }));
  };

  return { getPageBySlug, createOrUpdatePage };
});
