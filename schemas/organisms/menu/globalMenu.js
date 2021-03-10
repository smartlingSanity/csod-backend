export default {
  name: 'globalMenu',
  title: 'Global Menu',
  type: 'document',
  fields: [
    {
      name: 'globalMenuName',
      title: 'Name',
      type: 'string',
      description: 'Name must be Global Menu',
    },
    {
      name: 'globalMenuLinks',
      title: 'Global menu links',
      type: 'array',
      description: 'Renders a list of links',
      of: [{ type: 'link' }],
    },
  ],
  preview: {
    select: {
      title: '_type',
    },
  },
};
