import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  enabledLocaleField,
  routeField,
  sectionsField,
  smbRouteMatch,
  suiteTypeField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'smbProductPage',
  title: 'SMB Product Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    {
      ...routeField(false, smbRouteMatch.regex, smbRouteMatch.regexDescription),
      options: {
        filter: 'slug.current match $slug',
        filterParams: { slug: 'smb*' },
      },
    },
    suiteTypeField,
    {
      name: 'smbSuiteBannerSection',
      title: 'SMB Product Category Banner Section',
      type: 'smbSuiteBannerSection',
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
