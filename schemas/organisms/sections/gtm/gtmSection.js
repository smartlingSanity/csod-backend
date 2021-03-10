import SectionPreview from '../../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../../utils/index';

export default {
  name: 'gtmSection',
  title: 'GTM Section',
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
      name: 'gtmTextBlocks',
      title: 'GTM Text Blocks',
      type: 'array',
      of: [{ type: 'gtmTextBlock' }],
    },
  ],
  preview: {
    select: {
      title: 'gtmTextBlocks[0].headingText',
      media: 'gtmTextBlocks[0].image',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title,
      media,
      subtitle,
      background,
    }) => ({
      title,
      media,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
