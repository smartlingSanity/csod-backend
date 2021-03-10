export default {
  name: 'buttonV2',
  title: 'Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
    // {
    //   name: 'link',
    //   title: 'Link',
    //   type: 'array',
    //   of: [
    //     {
    //       title: 'External Link',
    //       type: 'externalLink',
    //     },
    //     { title: 'Internal Link', type: 'reference', to: [{ type: 'route' }] },
    //   ],
    //   validation: Rule => Rule.max(1).error('You can only choose one link'),
    // },
  ],
};
