import { localizePreview } from '../../utils/index';
import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';

export default {
  name: 'gradientCard',
  title: 'Gradient Card',
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
      name: 'headingText',
      title: 'Heading Text',
      type: 'localeString',
    },
    {
      name: 'suiteType',
      title: 'Product Category Type',
      type: 'string',
      options: {
        list: [
          { title: 'Learning', value: 'learning' },
          { title: 'Performance', value: 'performance' },
          { title: 'HR', value: 'hr' },
        ],
      },
    },
    {
      name: 'iconTextBlocks',
      title: 'Icon Text Blocks',
      type: 'array',
      of: [{ type: 'iconTextBlock' }],
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
    },
  ],
  preview: {
    select: {
      headingText: 'headingText',
      _type: '_type',
    },
    prepare: localizePreview(({ headingText, _type }) => ({
      title: headingText,
      subtitle: _type,
    })),
    component: SectionPreview,
  },
};
