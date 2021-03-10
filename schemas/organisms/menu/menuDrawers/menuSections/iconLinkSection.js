import { localizePreview } from '../../../../utils';

export default {
  name: 'iconLinkSection',
  title: 'Icon Link Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
    {
      name: 'iconLinks',
      title: 'Icon Links',
      type: 'array',
      of: [
        {
          title: 'Icon Link',
          type: 'iconLink',
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
