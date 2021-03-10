import { localizePreview } from '../../../utils/index';

export default {
  name: 'sharedTilesReference',
  title: 'Shared Tiles',
  type: 'document',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'tilesSection',
      title: 'Tiles Section',
      type: 'tilesSection',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: localizePreview(selection => selection),
  },
};
