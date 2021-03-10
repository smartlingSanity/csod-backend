import {
  routeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'officeLocationsPage',
  title: 'Office Locations',
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
      name: 'officeLocationSlantBanner',
      title: 'Slant Banner Section',
      type: 'officeLocationSlantBanner',
      validation: Rule => Rule.required(),
      options: {
        collapsible: true,
      },
    },
    {
      name: 'regions',
      title: 'Regions',
      type: 'array',
      of: [
        { type: 'officeRegionSection' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
