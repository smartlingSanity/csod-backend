export default {
  name: 'collage',
  title: 'Collage',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'csodImage',
        },
      ],
    },
  ],
};
