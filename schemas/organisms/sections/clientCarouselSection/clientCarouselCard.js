import { localizePreview } from '../../../utils';
import validation from '../../../utils/validation';

export default {
  name: 'clientCarouselCard',
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
      name: 'carouselHeading',
      title: 'Carousel Heading',
      type: 'localeString',
    },
    {
      name: 'carouselBg',
      title: 'Carousel Background Image',
      type: 'localeCsodImage',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'localeCsodImage',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'clientLogoNav',
      title: 'Client Logo for the Nav',
      type: 'localeCsodImage',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'clientDrawing',
      title: 'Client Drawing',
      type: 'localeCsodImage',
    },
    {
      name: 'clientQuote',
      title: 'Client Quote',
      type: 'localeText',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
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
      media: 'clientLogo',
      title: 'carouselHeading',
      subtitle: 'clientQuote',
    },
    prepare: localizePreview(selection => selection),
  },
};
