import { localizePreview } from '../utils';

export default {
  name: 'columnText',
  title: 'Column of Text',
  type: 'object',
  fields: [
    {
      name: 'columnBlocks',
      title: 'Blocks',
      type: 'array',
      of: [
        { type: 'textBlock' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
