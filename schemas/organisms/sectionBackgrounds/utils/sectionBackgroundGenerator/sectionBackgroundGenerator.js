export default ({
  name, title,
}) => ({
  name,
  title,
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
    },
  ],
  preview: {
    prepare() {
      return {
        title,
      };
    },
  },
});
