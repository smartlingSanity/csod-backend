import { localizePreview } from '../../../utils';

export default {
  name: 'gtmTextBlock',
  title: 'GTM Text Block',
  type: 'object',
  description: 'Go To Market section',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'localeCsodImage',
    },
    {
      name: 'headingPrefixText',
      title: 'Heading Prefix',
      type: 'localeString',
    },
    {
      name: 'headingText',
      title: 'Heading Text',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
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
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
