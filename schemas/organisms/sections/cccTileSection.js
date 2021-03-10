import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils';

export default {
  name: 'cccTileSection',
  title: 'CCC Tile Section',
  description: 'Choose a suite (default is content anytime) and featured courses',
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
      name: 'suiteTextBlock',
      title: 'Product Category Text Block',
      type: 'suiteTextBlock',
      description: 'Prefixed before course tiles...you probably want to put Content Anytime here',
    },
    {
      name: 'coursesTiles',
      title: 'Courses',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'course' }],
        },
      ],
      validation: Rule => Rule.max(3).error('A maximum of 3 Course Tiles are allowed'),
    },
  ],
  preview: {
    select: {
      title: 'coursesTile[0].courseTitle',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({ title, subtitle, background }) => ({
      title,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
