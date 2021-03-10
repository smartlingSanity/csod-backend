import { localizePreview } from '../utils';

export default {
  name: 'iconTextBlock',
  title: 'Icon Text Block',
  type: 'object',
  fields: [
    {
      name: 'experienceImage',
      title: 'Experience Image',
      description: 'Image will display in original size',
      type: 'localeCsodImage',
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
  ],
  preview: {
    select: {
      title: 'headingText',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
