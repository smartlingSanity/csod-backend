import { localizePreview } from '../../../utils/index';

export default {
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'object',
  description: 'An individual timeline item',
  fields: [
    {
      name: 'logo',
      title: 'Company logo',
      type: 'localeCsodImage',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'awardType',
      title: 'Award type',
      description: 'Ex. Leader, Major Player',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      media: 'logo',
    },
    prepare: localizePreview(selection => selection),
  },
};
