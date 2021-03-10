import {
  enabledLocaleField,
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'foundersPage',
  title: 'Founders',
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
      name: 'banner',
      title: 'Banner',
      type: 'heroBanner',
    },
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
