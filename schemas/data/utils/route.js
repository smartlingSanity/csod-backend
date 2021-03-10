/* The purpose of this module is to handle the existence of routes.
Avoid to create new documents when a route with a determined slug
is already in the CMS. */

const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const queue = require('./asyncQueue').default;

module.exports = function routeUtils(client) {
  async function createRoute({ name, slug, ...route }) {
    const _route = {
      _id: uuidv4(),
      _type: 'route',
      routeName: name,
      slug: {
        _type: 'slug',
        current: slug,
      },
      ...route,
    };
    try {
      return await queue.add(() => client.createIfNotExists(_route));
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async function getRouteBySlug(slug) {
    const route = await queue.add(() => client.fetch(`//groq
      *[_type=="route" && slug.current == "${slug}"][0]{
        ...
      }`));
    if (_.isEmpty(route)) {
      return null;
    }
    return route;
  }

  async function getRouteById(id) {
    const route = await queue.add(() => client.fetch(`//groq
      *[_type=="route" && _id == "${id}"][0]{
      ...
    }`));
    if (_.isEmpty(route)) {
      return null;
    }
    return route;
  }

  async function createRouteIfNotExists(route) {
    const _route = await getRouteBySlug(route.slug);
    if (_.isEmpty(_route)) {
      return createRoute(route);
    }
    return _route;
  }

  return {
    createRouteIfNotExists,
    createRoute,
    getRouteBySlug,
    getRouteById,
  };
};
