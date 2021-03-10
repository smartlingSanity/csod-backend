import { localizePreview } from '../utils';

export default {
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  description: 'A block that contains a heading, description, and a button',
  options: { collapsible: true },
  fields: [
    {
      name: 'align',
      title: 'Text Alignment',
      description: 'Choose if text will aligned left or center',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'icon',
      title: 'Icon',
      description: 'A small icon displayed above the text block',
      type: 'localeCsodImage',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'headingTextColor',
      title: 'Heading Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Dark Gray', value: 'darkGray' },
          { title: 'White', value: 'white' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'descriptionColor',
      title: 'Description Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Gray', value: 'gray' },
          { title: 'White', value: 'white' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'button',
      title: 'Button',
      type: 'array',
      of: [
        { type: 'button' },
        { type: 'videoButton' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      altTitle: 'description',
      subtitle: '_type',
      media: 'icon',
    },
    prepare: localizePreview((selection) => {
      const {
        title, altTitle, subtitle, media,
      } = selection;

      const titleToShow = title || altTitle;

      return {
        title: titleToShow,
        subtitle,
        media,
      };
    }),
  },
};
