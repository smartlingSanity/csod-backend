export default {
  name: 'linkV1',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Maximum of 1 link allowed!',
      type: 'array',
      of: [
        {
          title: 'External Link',
          type: 'externalLinkV1',
        },
      ],
      validation: Rule => Rule.max(1).error('You can only choose one link'),
    },
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
};
