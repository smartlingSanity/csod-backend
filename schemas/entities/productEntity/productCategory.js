export default {
  name: 'productCategory',
  title: 'Product Category',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    list: [
      { title: 'Careers', value: 'careers' },
      { title: 'Content', value: 'content' },
      { title: 'Development', value: 'development' },
      { title: 'HR', value: 'hr' },
      { title: 'Learning', value: 'learning' },
      { title: 'Performance', value: 'performance' },
      { title: 'Recruiting', value: 'recruiting' },
      { title: 'None', value: 'none' },
    ],
    layout: 'checkbox',
  },
  validation: Rule => Rule.required().error('A product type must be selected'),
};
