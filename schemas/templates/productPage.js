import {
  sectionsField,
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField('white'),
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'productEntity' }],
    },
    {
      name: 'suiteBenefitsBannerSection',
      title: 'Product Category Benefits Banner Section',
      type: 'suiteBenefitsBanner',
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
