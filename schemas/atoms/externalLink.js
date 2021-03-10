import { localizePreview } from '../utils';
import validation from '../utils/validation';

export default {
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'externalLink',
      description: 'A link outside of the Cornerstone website',
      type: 'localeUrl',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
  ],
  preview: {
    select: {
      title: 'externalLink',
    },
    prepare: localizePreview(selection => selection),
  },
};
