import { routeField, sectionsField, enabledLocaleField } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'formPage',
  title: 'Form Page',
  type: 'document',
  description: 'Form Page',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField(),
    {
      name: 'heroBanner',
      title: 'Hero Banner',
      type: 'heroBanner',
      options: { collapsible: true },
    },
    sectionsField(['formSection']),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
