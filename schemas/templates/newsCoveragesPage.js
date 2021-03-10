// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client';
import routeUtils from '../data/utils/route';
import {
  routeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

const { createRouteIfNotExists } = routeUtils(client);

export default {
  name: 'newsCoveragesPage',
  title: 'News Archive',
  type: 'document',
  description: 'Page to contain dynamic content for news coverages',
  initialValue: async () => {
    const title = 'News Coverages';
    const route = await createRouteIfNotExists({
      name: title,
      slug: '/company/in-the-news',
      enabled: true,
    });
    return {
      title,
      route: {
        _type: 'reference',
        _ref: route._id,
      },
    };
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'notFoundText',
      title: 'Not Found Text',
      description: 'Text to display in case not news coverages are found.',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField(),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
