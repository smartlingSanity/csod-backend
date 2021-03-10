import { filterDocumentPreview } from '../sharedFields';

export default {
  name: 'filterCategory',
  title: 'Filter Category',
  type: 'document',
  description: 'Top level filter item, it contains several filter items',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      description: 'Identifies filter categories across i18n datasets',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title to be displayed at the UI',
    },
    {
      name: 'filterItems',
      title: 'Filter Items',
      description: 'Array that contains each item of the category',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'filterItem' }] }],
    },
  ],
  preview: filterDocumentPreview('filterItems'),
};
