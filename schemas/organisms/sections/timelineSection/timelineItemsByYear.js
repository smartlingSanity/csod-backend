export default {
  name: 'timelineItemsByYear',
  title: 'Timeline Items by Year',
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
      name: 'year',
      title: 'Section Year',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'allTimelineItems',
      title: 'Timeline items',
      type: 'array',
      of: [
        { type: 'timelineItem' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: '_type',
    },
  },
};
