import { localizePreview } from '../utils/index';

export default {
  name: 'tagBar',
  title: 'TagBar',
  type: 'object',
  description: 'An optional newsbar section that appears on the hero banner.',
  fields: [
    {
      name: 'tagBarButtonText',
      title: 'TagBar Button Text',
      type: 'localeString',
    },
    {
      name: 'tagBarText',
      title: 'TagBar Text',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'A link is optional',
      type: 'link',
    },
  ],
  preview: {
    select: {
      title: 'tagBarButtonText',
      subtitle: 'tagBarText',
    },
    prepare: localizePreview(selection => selection),
  },
};
