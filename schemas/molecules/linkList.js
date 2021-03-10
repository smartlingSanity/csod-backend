import { localizePreview } from '../utils/index';

export default {
  name: 'linkList',
  title: 'Link List',
  type: 'object',
  fields: [
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        { type: 'link' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headingText',
    },
    prepare: localizePreview(selection => selection),
  },
};
