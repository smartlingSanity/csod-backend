export default {
  name: 'titleQuote',
  title: 'Title Quote',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'quote',
    },
  ],
  preview: {
    select: {
      media: 'quote.clientDrawing',
      title: 'title',
      subtitle: 'quote.quoteAuthor',
    },
  },
};
