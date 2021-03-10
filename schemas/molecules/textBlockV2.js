export default {
  name: 'textBlockV2',
  title: 'Text Block',
  type: 'object',
  description: 'A block that contains a heading, description, and a button ',
  fields: [
    {
      name: 'headingText',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'array',
      of: [
        { type: 'buttonV2' },
        { type: 'videoButtonV2' },
      ],
      validation: Rule => Rule.max(1).error('You may only choose 1 button'),
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      altTitle: 'description',
      subtitle: '_type',
    },
    prepare(selection) {
      const {
        title, altTitle, subtitle,
      } = selection;

      const titleToShow = title || altTitle;

      return {
        title: titleToShow,
        subtitle,
      };
    },
  },
};
