import { localizePreview } from '../utils';

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
  name: 'button',
  title: 'Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
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
    prepare: localizePreview(selection => selection),
  },
};
