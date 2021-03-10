export default {
  name: 'textBlockContentV1',
  title: 'Text Block Content',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
  ],
};
