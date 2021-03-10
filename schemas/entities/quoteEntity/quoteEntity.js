export default {
  name: 'quoteEntity',
  title: 'Quote',
  type: 'document',
  fields: [
    {
      name: 'quoteText',
      title: 'Quote',
      type: 'text',
      validation: Rule => Rule.required().error('Quote is required.'),
    },
    {
      name: 'author',
      title: 'Quote Author',
      type: 'string',
    },
    {
      name: 'authorJobTitle',
      title: 'Author Job Title',
      type: 'string',
    },
    {
      name: 'quoteImage',
      title: 'Quote Image',
      description: 'Image displayed to the left of the quote text (Recommended image width of 110px)',
      type: 'csodImage',
    },
  ],
  preview: {
    select: {
      media: 'quoteImage',
      title: 'quoteText',
      subtitle: 'author',
    },
  },
};
