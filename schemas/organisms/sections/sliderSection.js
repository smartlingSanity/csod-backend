export default {
  name: 'sliderSection',
  title: 'Slider Section',
  type: 'object',
  fields: [
    {
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'twoColumnSection',
        },
      ],
    },
  ],
};
