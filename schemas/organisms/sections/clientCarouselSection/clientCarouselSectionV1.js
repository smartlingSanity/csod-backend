export default {
  name: 'clientCarouselSectionV1',
  title: 'Client Carousel Section V1',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'clientCarouselCard',
      title: 'Carousel Cards',
      type: 'array',
      of: [{ type: 'clientCarouselCardV1' }],
    },
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: '_type',
    },
  },
};
