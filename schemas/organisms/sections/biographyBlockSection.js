import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils/index';

export default {
  name: 'biographyBlockSection',
  title: 'Biography Block Section',
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
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'biographyBlocks',
      title: 'Biography Blocks',
      description: 'Biography blocks were first used on the Board of Directors Page (/company/board-directors). You can view the Biography Block component in Storybook (https://project-jam-storybook.netlify.com/?path=/story/molecules--biographyblock)',
      type: 'array',
      of: [
        { type: 'biographyBlock' },
      ],
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'localeCsodImage',
    },

  ],
  preview: {
    select: {
      title: 'heading',
      type: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title, type, background, media,
    }) => ({
      title,
      subtitle: type,
      background,
      media,
    })),
    component: SectionPreview,
  },
};
