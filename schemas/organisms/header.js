export default {
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    {
      name: 'menuColor',
      title: 'Menu Color',
      type: 'string',
      description: 'Choose what color the logo and menu should be',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Primary', value: 'primary' },
          { title: 'Gray', value: 'gray' },
        ],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      title: 'menuColor',
    },
  },
};
