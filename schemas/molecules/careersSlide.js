export default {
  name: 'careersSlide',
  title: 'Careers Slide',
  type: 'object',
  fields: [
    {
      name: 'blockContent',
      title: 'Block Content',
      type: 'textBlockContentV1',
    },
    {
      name: 'collage',
      title: 'Collage',
      type: 'collage',
    },
  ],
  preview: {
    select: {
      title: 'blockContent.heading',
      media: 'collage.images.0',
    },
  },
};
