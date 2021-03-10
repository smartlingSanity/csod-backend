import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils/index';

export default {
  name: 'iconTextBlockSection',
  title: 'Icon Text Block Section',
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
      name: 'iconTextBlocks',
      title: 'Icon Text Blocks',
      type: 'array',
      of: [{ type: 'iconTextBlock' }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'iconTextBlocks[0].headingText',
      _type: '_type',
      image: 'iconTextBlocks[0].experienceImage',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title, _type, image, background,
    }) => ({
      title,
      subtitle: _type,
      media: image,
      background,
    })),
    component: SectionPreview,
  },
};
