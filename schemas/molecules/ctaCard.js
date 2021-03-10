import { localizePreview } from '../utils/index';

// localization NA
export const headingColors = {
  name: 'headingColor',
  title: 'Heading Color',
  type: 'string',
  options: {
    list: [
      { title: 'Accent', value: 'accent' },
      { title: 'Primary', value: 'primary' },
      { title: 'Gray', value: 'gray' },
      { title: 'Light Gray', value: 'lightGray' },
      { title: 'White', value: 'white' },
    ],
    layout: 'list',
  },
};

export default {
  name: 'ctaCard',
  title: 'Cta Card',
  type: 'object',
  description: 'A link or a button is required to display the card properly',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    headingColors,
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'localeString',
      description: 'Optional bolded text above text (e.g. for an author name)',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'localeString',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'localeCsodImage',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      options: { collapsible: true },
    },
    {
      name: 'animatedButton',
      title: 'Animated Button',
      type: 'animatedButton',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare: localizePreview(selection => selection),
  },
};
