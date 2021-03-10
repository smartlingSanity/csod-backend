import { filterDocumentPreview } from '../sharedFields';

export default {
  name: 'filterItem',
  title: 'Filter Item',
  type: 'document',
  description: 'Lowest level of the filter menu, they are referenced by any other documents in order to be filtered',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      description: 'Identifies filter items across i18n datasets',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title to be displayed at the UI',
    },
  ],
  preview: filterDocumentPreview(),
};
