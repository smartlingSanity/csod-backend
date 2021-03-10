export default {
  name: 'productType',
  title: 'Product Type',
  type: 'string',
  options: {
    list: [
      { title: 'Careers', value: 'careers' },
      { title: 'Content Anytime', value: 'contentAnytime' },
      { title: 'Development', value: 'development' },
      { title: 'HR', value: 'hr' },
      { title: 'Learning', value: 'learning' },
      { title: 'Performance', value: 'performance' },
      { title: 'Recruiting', value: 'recruiting' },
      { title: 'None', value: 'none' },
    ],
    layout: 'dropdown',
  },
  validation: Rule => Rule.required().error('A product type must be selected'),
};