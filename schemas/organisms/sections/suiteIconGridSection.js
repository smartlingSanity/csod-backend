// localized NA (iconTextBlockDone)
export default {
  name: 'suiteIconGridSection',
  title: 'Product Category Icon Grid Section',
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
      name: 'iconTextBlocks',
      title: 'Icon Text Blocks',
      type: 'array',
      of: [{ type: 'iconTextBlock' }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: '_type',
      subtitle: '_type',
    },
  },
};
