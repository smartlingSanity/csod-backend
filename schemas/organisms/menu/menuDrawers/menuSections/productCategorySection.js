import { localizePreview } from '../../../../utils';

export default {
  name: 'productCategorySection',
  title: 'Product Category Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
  ],
  preview: {
    select: {
      title: 'menuSectionConfig.sectionName',
    },
    prepare: localizePreview(selection => selection),
  },
};
