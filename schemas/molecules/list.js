export default {
  name: 'list',
  title: 'List',
  type: 'object',
  fields: [
    {
      name: 'list',
      title: 'Lists',
      type: 'array',
      of: [{ type: 'listItem' }],
    },
  ],
};
