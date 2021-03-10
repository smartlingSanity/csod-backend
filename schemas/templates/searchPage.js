import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'searchpage',
  title: 'Search Results',
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
      name: 'suggestionLinks',
      title: 'Suggestion Links',
      type: 'array',
      of: [{ type: 'link' }],
    },
    bubbleCtaField,
  ],
  initialValue: {
    ...bubbleCtaFieldInitialValue,
  },
  preview: {
    select: { title: 'title' },
    prepare: localizePreview(selection => selection),
  },
};
