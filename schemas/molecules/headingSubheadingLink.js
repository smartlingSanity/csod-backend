import { localizePreview } from '../utils/index';

export default {
  name: 'headingSubheadingLink',
  title: 'Heading Subheading Link',
  type: 'object',
  fields: [
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'subheadingText',
      title: 'Subheading',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      subtitle: 'subheadingText',
    },
    prepare: localizePreview(selection => selection),
  },
};
