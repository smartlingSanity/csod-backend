export default {
  name: 'linkWithoutTitle',
  title: 'Link without Title',
  type: 'object',
  fields: [
    {
      name: 'link',
      title: 'Link',
      description: 'Maximum of 1 link allowed!',
      type: 'array',
      of: [
        {
          title: 'External Link',
          type: 'externalLink',
        },
        {
          title: 'Internal Link', description: 'A link to a page within the Cornerstone website', type: 'reference', to: [{ type: 'route' }],
        },
        {
          title: 'File Link',
          type: 'fileLink',
        },
      ],
      validation: Rule => Rule.max(1).error('You can only choose one link'),
    },
  ],
};
