import { localizePreview } from '../../../../utils/index';

export default {
  name: 'inlineLinkSection',
  title: 'Inline Link Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
    {
      name: 'inlineLinkSectionItems',
      title: 'Inline Link Section Items',
      type: 'array',
      of: [
        {
          title: 'Inline Link Item',
          type: 'inlineLinkItem',
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
