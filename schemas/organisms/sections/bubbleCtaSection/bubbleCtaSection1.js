import { localizePreview } from '../../../utils';

export default {
  name: 'bubbleCtaSection1',
  title: 'Bubble Cta Section',
  type: 'object',
  fields: [
    {
      name: 'bubbleCtaReference1',
      type: 'reference',
      to: [{ type: 'bubbleCtaReference1' }],
      options: {
        collapsible: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'bubbleCtaReference1.heading',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
