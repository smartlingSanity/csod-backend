import { localizePreview } from '../../../utils';

export default {
  name: 'awardsSection',
  title: 'Awards Section',
  type: 'object',
  fields: [
    {
      name: 'headingText',
      title: 'Heading Text',
      type: 'localeString',
    },
    {
      name: 'mainImage',
      title: 'Main Image: Trophy',
      type: 'localeCsodImage',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image: Stars',
      type: 'localeCsodImage',
    },
    {
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{ type: 'award' }],
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      subtitle: '_type',
      media: 'mainImage',
    },
    prepare: localizePreview(selection => selection),
  },
};
