import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'thankYouPage',
  title: 'Thank You Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    enabledLocaleField(),
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
    },
    routeField(),
    bubbleCtaField, // done
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
