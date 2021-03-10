import { routeField, sectionsField, enabledLocaleField } from '../sharedFields';
import { localizePreview } from '../utils/index';
import validation from '../utils/validation';

export default {
  name: 'glossaryPage',
  title: 'All Terms',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    enabledLocaleField(),
    routeField(),
    sectionsField(['blockContentSection']),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: localizePreview(selection => selection),
  },
};
