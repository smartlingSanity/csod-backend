import {
  sectionsField,
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  enabledLocaleField,
  routeField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'boardOfDirectorsPage',
  title: 'Board of Directors',
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
      name: 'header',
      title: 'Header Color',
      type: 'header',
    },
    sectionsField('allSections', ['slantBanner']),
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
