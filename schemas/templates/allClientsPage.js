import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  sectionsField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'allclientspage',
  title: 'All Customers',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'backgroundImage',
      title: 'Page Background Image',
      type: 'localeCsodImage',
    },
    enabledLocaleField(),
    routeField(),
    {
      name: 'allClientsSlantBanner',
      title: 'Slant Banner Section',
      type: 'allClientsSlantBanner',
      validation: Rule => Rule.required(),
      options: {
        collapsible: true,
      },
    },
    sectionsField('allSections'),
    bubbleCtaField,
  ],
  initialValue: {
    ...bubbleCtaFieldInitialValue,
  },
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
