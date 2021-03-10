import { localizePreview } from '../../utils';

export default {
  name: 'suiteCards',
  title: 'Product Category Cards Section',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'subtitle',
      title: 'Sub-Title',
      type: 'localeString',
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'suiteCard' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
