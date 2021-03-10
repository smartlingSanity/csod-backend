import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  sectionsField,
  suiteTypeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'suitebenefitspage',
  title: 'Product Category Benefits',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    routeField(),
    enabledLocaleField(),
    suiteTypeField,
    sectionsField('allSections', ['suiteBenefitsBanner']),
    bubbleCtaField,
  ],
  initialValue: {
    ...bubbleCtaFieldInitialValue,
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'route.slug.current',
    },
    prepare: localizePreview(selection => selection),
  },
};
