export default {
  name: 'csodImage',
  title: 'Image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      title: 'Alt',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'translateX',
      title: 'Horizontal Offset (in px, can be positive or negative)',
      description: 'This value can move an image right (positive) or left (negative)',
      type: 'number',
    },
    {
      name: 'translateY',
      title: 'Vertical Offset (in px, can be positive or negative)',
      description: 'This value can move an image down (positive) or up (negative)',
      type: 'number',
    },
  ],
};
