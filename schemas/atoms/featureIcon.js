export default {
  name: 'featureIcon',
  title: 'Feature Icon',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'csodImage',
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'linkV1',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'link.text',
      media: 'icon',
    },
  },
};
