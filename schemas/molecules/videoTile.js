import { localizePreview } from '../utils';

export default {
  name: 'videoTile',
  title: 'Video Tile',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'inlineVideo',
      validation: Rule => Rule.required(),
    },
    {
      name: 'videoLength',
      title: 'Video Length (example: "1:02 min")',
      type: 'localeString',
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
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare: localizePreview(selection => selection),
  },
};
