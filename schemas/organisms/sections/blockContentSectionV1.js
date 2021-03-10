// eslint-disable-next-line no-unused-vars
import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';

export default {
  name: 'blockContentSectionV1',
  title: 'Block Content',
  type: 'object',
  description: 'This is a WYSIWYG section where you can add basic fields',
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
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      blockContentText: 'content[0].children[0].text',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare({ blockContentText, background }) {
      return {
        title: blockContentText || 'Block Content (no preview)',
        subtitle: 'blockContent',
        background,
      };
    },
    component: SectionPreview,
  },
};
