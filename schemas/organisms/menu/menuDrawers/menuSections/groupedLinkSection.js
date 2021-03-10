import { localizePreview } from '../../../../utils';

export default {
  name: 'groupedLinkSection',
  title: 'Grouped Link Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
    {
      name: 'groupedLinks',
      title: 'Grouped Links',
      type: 'groupedLinks',
    },

  ],
  preview: {
    select: {
      title: 'menuSectionConfig.sectionName',
    },
    prepare: localizePreview(selection => selection),
  },
};
