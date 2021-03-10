import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  sectionsField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'clientPage',
  title: 'Customer Detail',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField(),
    sectionsField('allSections', ['clientSlantBanner']),
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
