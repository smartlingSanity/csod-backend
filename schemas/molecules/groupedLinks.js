import { localizePreview } from '../utils';

export default {
  name: 'groupedLinks',
  title: 'Grouped Links',
  type: 'object',
  fields: [
    {
      name: 'groupHeading',
      title: 'Group Heading',
      type: 'localeString',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          title: 'Heading Subheading Link',
          type: 'headingSubheadingLink',
        },
      ],
    },
  ],
  preview: {
    select: { title: 'groupHeading' },
    prepare: localizePreview(selection => selection),
  },
};
