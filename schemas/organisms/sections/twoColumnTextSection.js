import { localizePreview } from '../../utils';

export default {
  name: 'twoColumnTextSection',
  title: 'Two Column Text Section',
  type: 'object',
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
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'localeCsodImage',
    },
    {
      name: 'leftBlock',
      title: 'Left Column',
      type: 'columnText',
    },
    {
      name: 'rightBlock',
      title: 'Right Column',
      type: 'columnText',
    },
  ],
  preview: {
    select: {
      title: '_type',
      media: 'backgroundImage',
    },
    prepare: localizePreview(selection => selection),
  },
};
