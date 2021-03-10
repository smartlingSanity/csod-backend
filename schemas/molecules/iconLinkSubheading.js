import { localizePreview } from '../utils/index';

export default {
  name: 'iconLinkSubheading',
  title: 'Icon Link Subheading',
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
      name: 'subheadingText',
      title: 'Subheading',
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
      subtitle: 'subheadingText',
      media: 'image',
    },
    prepare: localizePreview(selection => selection),
  },
};
