import { localizePreview } from '../../../utils/index';

export default {
  name: 'statsCounterSection',
  title: 'Stats Counter Section',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      description: 'Background color for this component is locked at dark gray',
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
      name: 'headingText',
      title: 'Heading Text',
      type: 'localeString',
    },
    {
      name: 'statsCounterBlocks',
      title: 'Stats Counter Blocks',
      type: 'array',
      of: [{ type: 'statsCounter' }],
      validation: Rule => [
        Rule.required().min(3).error('Need at least 3 stats inside statsCounterSection'),
      ],
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
