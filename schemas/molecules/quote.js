export default {
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    {
      name: 'clientDrawing',
      title: 'Drawing',
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
    {
      name: 'orientation',
      title: 'Orientation',
      description: 'Choose vertical or horizontal',
      type: 'string',
      options: {
        list: [
          { title: 'Vertical', value: 'vertical' },
          { title: 'Horizontal (default)', value: 'horizontal' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
  ],
  preview: {
    select: {
      media: 'clientDrawing',
      title: 'clientQuote',
      subtitle: 'quoteAuthor',
    },
  },
};
