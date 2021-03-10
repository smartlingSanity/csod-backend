export const buttonColors = {
  name: 'color',
  title: 'Button Color',
  type: 'string',
  options: {
    list: [
      { title: 'Accent', value: 'accent' },
      { title: 'Primary', value: 'primary' },
      { title: 'Gray', value: 'gray' },
      { title: 'Light Gray', value: 'lightGray' },
      { title: 'White', value: 'white' },
      { title: 'Mint', value: 'mint' },
      { title: 'Dark Blue', value: 'darkBlue' },
    ],
    layout: 'list',
  },
};

export default {
  name: 'buttonV1',
  title: 'Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'linkV1',
    },
    buttonColors,
    {
      name: 'buttonShadow',
      title: 'Button Shadow',
      type: 'boolean',
    },
    {
      name: 'buttonOutline',
      title: 'Button Outline',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'color',
    },
  },
};
