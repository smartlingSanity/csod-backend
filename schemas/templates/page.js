import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  sectionsField,
  scheduledPublishTime,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  description: 'Generic Page',
  i18n: true,
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
    sectionsField('allSections', ['heroBanner', 'slantBanner']),
    bubbleCtaField,
    scheduledPublishTime,
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
