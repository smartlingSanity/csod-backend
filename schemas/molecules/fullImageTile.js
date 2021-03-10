import { localizePreview } from '../utils';
import validation from '../utils/validation';

export default {
  name: 'fullImageTile',
  title: 'Full Image Tile',
  type: 'object',
  description: 'A tile that displays an image as a background, as well as a heading and subheading',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      description: 'e.g. Adam Miller',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'localeString',
      description: 'e.g. Founder & CEO',
    },
    {
      name: 'bgImage',
      title: 'Background image',
      type: 'localeCsodImage',
      validation: Rule => Rule.custom(validation.requiredByLocale).error('A tile image is required.'),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      options: { collapsible: true },
      validation: Rule => Rule.required().error('A link is required.'),
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'bgImage',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
