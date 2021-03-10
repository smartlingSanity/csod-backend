export default {
  name: 'socialMedia',
  title: 'Social Media',
  type: 'document',
  description: 'Represents a mechanism to share a page url',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Identifies social media across i18n datasets',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title to be displayed at the UI',
    },
  ],
};
