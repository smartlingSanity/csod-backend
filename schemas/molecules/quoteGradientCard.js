import { localizePreview } from '../utils/index';

export default {
  name: 'quoteGradientCard',
  title: 'Quote Gradient Card',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsable: true,
      },
    },
    {
      name: 'clientImage',
      title: 'Client Image',
      type: 'localeCsodImage',
    },
    {
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'localeString',
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'localeString',
    },
    {
      name: 'clientQuote',
      title: 'Quote',
      type: 'localeText',
    },
    {
      name: 'suiteType',
      title: 'Product Category Type',
      type: 'string',
      description: 'Determines the color of the gradient',
      options: {
        list: [
          { title: 'Learning', value: 'learning' },
          { title: 'Performance', value: 'performance' },
          { title: 'HR', value: 'hr' },
        ],
      },
    },
  ],
  preview: {
    select: {
      media: 'clientImage',
      title: 'clientQuote',
      subtitle: 'quoteAuthor',
    },
    prepare: localizePreview(selection => selection),
  },
};
