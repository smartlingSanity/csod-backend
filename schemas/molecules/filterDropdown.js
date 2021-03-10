import { filterDocumentPreview } from '../sharedFields';

export default {
  name: 'filterDropdown',
  title: 'Filter Dropdown',
  type: 'document',
  description: "Filter menu's section, could contain both filter categories or items",
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      description: 'Identifies filter sections across i18n datasets',
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
      description: 'Filter items to be shown under the section',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'filterCategory' }, { type: 'filterItem' },
          ],
        },
      ],
    },
  ],
  preview: filterDocumentPreview('filterItems'),
};
