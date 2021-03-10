export default {
  name: 'statsTile',
  title: 'Stats Tile',
  type: 'object',
  description: 'A stats tile that display our stats',
  fields: [
    {
      name: 'statsTileCards',
      title: 'Stats Tile Cards',
      type: 'array',
      of: [{ type: 'statsTileCard' }],
      validation: Rule => Rule.max(3).error('You can only add 3 cards max'),
    },
  ],
  preview: {
    // have to select something in order for the prepare function
    // to return the text we want to display
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Stats Tile Cards',
      };
    },
  },
};
