import {
  sectionsField,
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'productCategoryPage',
  title: 'Product Category',
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
      name: 'productCategory',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategoryEntity' }],
    },
    {
      name: 'suiteBannerSection',
      title: 'Product Category Banner Section',
      type: 'suiteBannerSection',
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
