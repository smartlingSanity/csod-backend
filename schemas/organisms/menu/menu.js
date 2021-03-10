export default {
  name: 'menu',
  title: 'Main Menu',
  type: 'document',
  fields: [
    {
      name: 'menuName',
      title: 'Name',
      readOnly: true,
      type: 'string',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      description: 'Defaults to "get demo"',
      type: 'localeString',
    },
    {
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'reference',
      to: [{ type: 'route' }],
    },
    {
      name: 'useAngleOnHomepage',
      title: 'Use Angled Button on Homepage',
      description: 'Determine whether to use an Angled Button in the menu on the homepage only (defaults to false)',
      type: 'boolean',
    },
    {
      name: 'menuDrawers',
      title: 'Menu Drawers',
      type: 'array',
      of: [
        {
          title: 'Menu Drawer',
          type: 'menuDrawer',
        },
      ],
    },
  ],
};
