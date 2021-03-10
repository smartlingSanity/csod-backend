export default {
  name: 'suiteCardQuote',
  title: 'Product Category Card Quote',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Quote Text',
      type: 'localeString',
    },
    {
      name: 'author',
      title: 'Quote Author',
      type: 'localeString',
    },
    {
      name: 'authorRole',
      title: 'Author Role',
      type: 'localeString',
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'localeCsodImage',
    },
    {
      name: 'icon',
      title: 'Author Image',
      type: 'localeCsodImage',
    },
  ],
};
