import validation from '../utils/validation';

export default {
  name: 'linkTile',
  title: 'Link Tile',
  type: 'object',
  fields: [
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: Rule => Rule.required().error('A link is required.'),
    },
    {
      name: 'openInNewWindow',
      title: 'Open in new window?',
      type: 'boolean',
    },
    {
      name: 'tileImage',
      title: 'Tile Image',
      type: 'localeCsodImage',
      validation: Rule => Rule.custom(validation.requiredByLocale).error('A tile image is required.'),
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
  },
};
