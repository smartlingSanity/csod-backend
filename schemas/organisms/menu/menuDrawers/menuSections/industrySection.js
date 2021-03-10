import { localizePreview } from '../../../../utils';

export default {
  name: 'industrySection',
  title: 'Industry Link Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'industryLinks',
      title: 'Industry Links',
      type: 'array',
      of: [
        {
          title: 'Link',
          type: 'link',
        },
      ],
    },

  ],
  preview: {
    select: {
      title: 'menuSectionConfig.sectionName',
    },
    prepare: localizePreview(selection => selection),
  },
};
