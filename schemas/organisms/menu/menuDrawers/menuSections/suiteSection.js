import { localizePreview } from '../../../../utils';

export default {
  name: 'suiteSection',
  title: 'Product Category Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
    {
      name: 'suiteSectionItems',
      title: 'Product Category Section Items',
      type: 'array',
      of: [
        {
          title: 'Product Category Section Item',
          type: 'suiteSectionItem',
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
