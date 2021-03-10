export default {
  name: 'clientFixedSideBarV1',
  title: 'Client Fixed Side Bar V1',
  type: 'object',
  fields: [
    {
      name: 'clientEntity',
      title: 'Client',
      description: 'Client used to populate product categories used in the fixed side bar',
      type: 'reference',
      to: [{ type: 'clientEntity' }],
      validation: Rule => Rule.required().custom((sections, context) => {
        if (context.document.sections[0].fixedSideBar.hide) return true;
        if (!context.document.sections[0].fixedSideBarV1.clientEntity) return 'Client is required';
        return true;
      }),
    },
    {
      name: 'button',
      title: 'Button',
      description: 'Button displayed at bottom of product category list',
      type: 'button',
    },
  ],
};
