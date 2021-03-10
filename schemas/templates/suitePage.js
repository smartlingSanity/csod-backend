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
  name: 'suitepage',
  title: 'Product Category Overview',
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
      subtitle: 'route.slug.current',
    },
    prepare: localizePreview(selection => selection),
  },
};
