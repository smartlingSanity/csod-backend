import { localizePreview } from '../utils/index';

export default {
  name: 'iconLink',
  title: 'Icon Link',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'localeCsodImage',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      media: 'image',
    },
    prepare: localizePreview(selection => selection),
  },
};
