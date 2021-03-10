export default {
  name: 'suitePathItem',
  title: 'Product Category Path Item',
  type: 'object',
  description: 'A card for the suite and a text block for elaboration',
  fieldsets: [
    {
      name: 'elaborationText',
      title: 'Elaboration Text',
      description: 'Text block that explains what the Suite can be used for',
    },
  ],
  fields: [
    {
      name: 'suiteTextBlock',
      title: 'Product Category Text Block',
      type: 'suiteTextBlock',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'string',
      fieldset: 'elaborationText',
    },
    {
      name: 'suitePathImage',
      title: 'Product Category Path Image',
      type: 'csodImage',
      description: 'The section of the path associated with this suite',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      altTitle: 'description',
      subtitle: '_type',
      media: 'icon',
    },
  },
};
