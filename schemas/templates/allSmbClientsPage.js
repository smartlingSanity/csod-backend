import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  enabledLocaleField,
  routeField,
  sectionsDescription,
  smbRouteMatch,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'allSmbClientsPage',
  title: 'All SMB Customers',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'backgroundImage',
      title: 'Page Background Image',
      type: 'localeCsodImage',
    },
    enabledLocaleField(),
    {
      ...routeField(false, smbRouteMatch.regex, smbRouteMatch.regexDescription),
      options: {
        filter: 'slug.current match $slug',
        filterParams: { slug: 'smb*' },
      },
    },
    {
      name: 'allSmbClientsSlantBanner',
      title: 'SMB Slant Banner Section',
      type: 'allSmbClientsSlantBanner',
      validation: Rule => Rule.required(),
      options: {
        collapsible: true,
      },
    },
    {
      title: 'Sections',
      name: 'sections',
      description: sectionsDescription,
      type: 'array',
      of: [
        { type: 'iconHeadingSection' },
        { type: 'clientCarouselCard' },
        { type: 'oneColumnSection' },
        { type: 'twoColumnSection' },
        { type: 'clientTileSection' },
        { type: 'ctaCardsSection' },
        { type: 'multiSection' },
      ],
    },
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
