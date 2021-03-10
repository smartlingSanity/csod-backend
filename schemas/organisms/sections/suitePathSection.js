export default {
  name: 'suitePathSection',
  title: 'Product Category Path Section',
  type: 'object',
  fields: [
    {
      name: 'hide',
      title: 'Hide Section',
      type: 'boolean',
    },
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'backgroundImage',
      title: 'Full Background Image',
      description: 'A background image that spans the container',
      type: 'csodImage',
    },
    {
      name: 'oneColumnSection',
      title: 'One Column Section',
      type: 'oneColumnSection',
    },
    {
      name: 'suitePathItems',
      title: 'Product Category Path Items',
      type: 'array',
      of: [{ type: 'suitePathItem' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'suitePathGrayAbove',
      title: 'Gray Product Category Path Image (Above)',
      type: 'csodImage',
      description: 'The gray section of path above the Product Category cards',
    },
    {
      name: 'suitePathGrayBelow',
      title: 'Gray Suite Path Image (Below)',
      type: 'csodImage',
      description: 'The gray section of path below the Product Category cards',
    },
    {
      name: 'cccTileSection',
      title: 'Courses Tile Section',
      type: 'cccTileSection',
    },
  ],
  preview: {
    select: {
      title: 'oneColumnSection.textBlock.headingText',
      subtitle: '_type',
      media: 'backgroundImage',
    },
  },
};
