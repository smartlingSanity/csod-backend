export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  description: 'A tile that displays an image as a background, as well as a heading and subheading',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. Adam Miller',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. Founder & CEO',
    },
    {
      name: 'image',
      title: 'Headshot',
      type: 'csodImage',
      validation: Rule => Rule.required().error('A tile image is required.'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: '_type',
    },
  },
};
