export default {
  name: 'award',
  title: 'Award',
  type: 'object',
  fields: [
    {
      name: 'subheadingText',
      title: 'Subheading Text',
      type: 'localeString',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'link',
    },
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'localeCsodImage',
    },
  ],
};
