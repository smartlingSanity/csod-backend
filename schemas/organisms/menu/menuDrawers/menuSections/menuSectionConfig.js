import { localizePreview } from '../../../../utils/index';

export default {
  name: 'menuSectionConfig',
  title: 'Menu Section Config',
  type: 'object',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'localeString',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'lightGray' },
        ],
      },
      layout: 'radio',
    },
  ],
  options: {
    collapsible: true,
  },
  preview: {
    select: {
      title: 'sectionName',
      subtitle: 'backgroundColor',
    },
    prepare: localizePreview(selection => selection),
  },
};
