import { routeField, enabledLocaleField } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'marketplacePage',
  title: 'Marketplace Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title of the page',
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
