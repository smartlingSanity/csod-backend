export default {
  name: 'careersSlider',
  title: 'Careers Slider',
  type: 'object',
  fields: [
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{ type: 'careersSlide' }],
    },
  ],
};
