export default {
  name: 'videoButtonV2',
  title: 'Video Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'video',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
  ],
};
