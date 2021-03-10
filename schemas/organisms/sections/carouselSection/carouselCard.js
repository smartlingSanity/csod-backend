import { localizePreview } from '../../../utils';
import validation from '../../../utils/validation';

export default {
  name: 'carouselCard',
  title: 'Carousel Card',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
      description: 'Heading for the carousel, also used for navigation (e.g. Professional Skills)',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'carouselBg',
      title: 'Carousel Background Image',
      type: 'localeCsodImage',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'localeCsodImage',
    },
    {
      name: 'subheadingText',
      title: 'Subheading',
      type: 'localeString',
    },
    {
      name: 'subheadingTextColor',
      title: 'Subheading Color',
      type: 'string',
      options: {
        list: [
          { title: 'Accent', value: 'accent' },
          { title: 'Primary', value: 'primary' },
          { title: 'Gray', value: 'mediumGray' },
          { title: 'Seafoam', value: 'seafoam' },
        ],
        layout: 'list',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'videoButton',
      title: 'Video Button',
      type: 'videoButton',
    },
    {
      name: 'animatedButton',
      title: 'Animated Button',
      type: 'animatedButton',
    },
  ],
  preview: {
    select: {
      media: 'logo',
      title: 'headingText',
      subtitle: 'subheadingText',
    },
    prepare: localizePreview(selection => selection),
  },
};
