import { filterDocumentPreview } from '../../sharedFields';

export default {
  name: 'filterMenu',
  title: 'Filter Menu',
  type: 'document',
  description: 'Main filter menu, it contains several Dropdowns',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      description: 'Identifies filter menus across i18n datasets',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title to be displayed at the UI',
    },
    {
      name: 'closeTitle',
      title: 'Close Menu Title',
      type: 'localeString',
      description: 'Title to indicate the user to close the menu',
    },
    {
      name: 'openTitle',
      title: 'Open Menu Title',
      type: 'localeString',
      description: 'Title to indicate the user to open the menu',
    },
    {
      name: 'clearTitle',
      title: 'Clear Title',
      type: 'localeString',
      description: 'Title to be shown at the `clear` filter option',
    },
    {
      name: 'filterTitle',
      title: 'Filter Title',
      type: 'localeString',
      description: 'Title of the filterDropdowns section at the filter menu',
    },
    {
      name: 'filterDropdowns',
      title: 'Filter Dropdowns',
      description: 'Array that contains each dropdown of the menu',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'filterDropdown' }] }],
    },
    {
      name: 'sortTitle',
      title: 'Sort Title',
      type: 'localeString',
      description: 'Title of the sortOptions section at the filter menu',
    },
    {
      name: 'sortOptions',
      title: 'Sort Options',
      description: 'Sorting options of the filter menu',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sortOption' }] }],
    },
  ],
  preview: filterDocumentPreview('filterDropdowns'),
};
