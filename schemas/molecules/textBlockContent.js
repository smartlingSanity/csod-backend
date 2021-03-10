import getOr from 'lodash/fp/getOr';
import { localizePreview } from '../utils';

export default {
  name: 'textBlockContent',
  title: 'Text Block Content',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'localeBlockContent',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      content: 'content',
    },
    prepare: localizePreview(({ heading, content }) => ({
      title: heading,
      subtitle: getOr(
        'Block Content (no preview)',
        '0.children.0.text',
        content,
      ),
    })),
  },
};
