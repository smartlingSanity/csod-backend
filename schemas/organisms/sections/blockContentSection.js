// eslint-disable-next-line no-unused-vars
import getOr from 'lodash/fp/getOr';
import { localizePreview } from '../../utils/index';
import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';

export default {
  name: 'blockContentSection',
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
      type: 'localeBlockContent',
    },
  ],
  preview: {
    select: {
      blockContent: 'content',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({ blockContent, background }) => {
      const blockContentText = getOr('Block Content (no preview)', '0.children.0.text', blockContent);
      return {
        title: blockContentText,
        subtitle: 'blockContent',
        background,
      };
    }),
    component: SectionPreview,
  },
};
