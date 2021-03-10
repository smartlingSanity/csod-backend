import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  sectionsField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'executivePage',
  title: 'Executive Page',
  type: 'document',
  description: 'Executive Page',
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
