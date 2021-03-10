import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  enabledLocaleField,
  routeField,
  sectionsField,
  smbRouteMatch,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'smbPage',
  title: 'SMB Page',
  type: 'document',
  description: 'SMB Page',
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
    {
      name: 'header',
      title: 'Header Color',
      type: 'header',
    },
    sectionsField('allSections', ['smbSlantBanner']),
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
