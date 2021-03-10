export default {
  name: 'footerMenu',
  title: 'Footer Menu',
  type: 'document',
  fields: [
    {
      name: 'footerMenuName',
      title: 'Name',
      type: 'string',
      description: 'Name must be Footer Menu',
      readOnly: true,
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'localeCsodImage',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeString',
      description: 'Can put a short blurb (e.g. Talk to Sales)',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'localeString',
      description: 'Phone Number (e.g. 888-888-8888)',
    },
    {
      name: 'footerMenuColumns',
      title: 'Footer Menu Columns',
      type: 'array',
      description: 'Renders a column with a heading with a list of links',
      of: [{ type: 'linkList' }],
    },
    {
      name: 'subscribeForm',
      title: 'Subscribe Form',
      type: 'footerSubscribeForm',
      validation: Rule => Rule.required().error('Form is required'),
    },
    {
      name: 'socialIcons',
      title: 'Social Icons',
      type: 'array',
      of: [{ type: 'socialIcon' }],
    },
    {
      name: 'copyright',
      title: 'Copyright Footer',
      type: 'array',
      description: 'List of links in the footer (e.g. Privacy, legal, etc.)',
      of: [{ type: 'link' }],
    },
  ],
  preview: {
    select: {
      title: '_type',
    },
  },
};
