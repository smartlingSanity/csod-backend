import {
  enabledLocaleField,
  routeField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'eventsPage',
  title: 'Events and Webinars Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField(),
    {
      title: 'Slant Banner',
      name: 'slantBanner',
      type: 'slantBanner',
      description: 'Slant banner to show at the top of the page',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
