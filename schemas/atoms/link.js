import { localizePreview } from '../utils';

export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Maximum of 1 link allowed!',
      type: 'array',
      of: [
        {
          title: 'External Link',
          type: 'externalLink',
        },
        {
          title: 'Internal Link', description: 'A link to a page within the Cornerstone website', type: 'reference', to: [{ type: 'route' }],
        },
        {
          title: 'File Link',
          type: 'fileLink',
        },
        {
          title: 'Phone Number',
          type: 'phoneNumber',
        },
      ],
      validation: Rule => Rule.max(1).error('You can only choose one link'),
    },
  ],
  preview: {
    select: {
      title: 'text',
    },
    prepare: localizePreview(selection => selection),
  },
};
