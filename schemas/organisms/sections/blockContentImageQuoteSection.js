export default {
  name: 'blockContentImageQuoteSection',
  title: 'Section with img to left, quote on right',
  type: 'object',
  fields: [
    {
      name: 'leftColumnImage',
      title: 'Image on left side',
      type: 'csodImage',
    },
    {
      name: 'clientDrawing',
      title: 'Customer Drawing',
      type: 'csodImage',
    },
    {
      name: 'clientQuote',
      title: 'Customer Quote',
      type: 'text',
    },
    {
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'string',
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: '_type',
      media: 'image',
    },
  },
};
