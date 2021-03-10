export default {
  name: 'timelineSection',
  title: 'Timeline Section',
  type: 'object',
  fields: [
    {
      name: 'timelineItemsByYear',
      title: 'Timeline Items by Year',
      type: 'array',
      of: [
        { type: 'timelineItemsByYear' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'timelineItemsByYear[0].year',
      subtitle: '_type',
    },
  },
};
