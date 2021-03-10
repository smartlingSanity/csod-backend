export default {
  name: 'personTile',
  title: 'Person Tile',
  type: 'object',
  fields: [
    {
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.image',
    },
  },
};
