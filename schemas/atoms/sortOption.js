export default {
  name: 'sortOption',
  title: 'Sort Option',
  type: 'document',
  description: 'Sort option of the filter menu',
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
    {
      name: 'fieldName',
      title: 'Field name',
      type: 'string',
      description: 'Field that is a sorting criteria for this item',
    },
    {
      name: 'order',
      title: 'Order',
      description: 'Order in which results are going to be sorted',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {
            title: 'Ascending', value: 'asc',
          },
          {
            title: 'Descending', value: 'desc',
          },
        ],
      },
    },
  ],
};
