export default {
  name: 'subscriptionFixedSideBar',
  title: 'Subscription Fixed Side Bar',
  type: 'object',
  fields: [
    {
      name: 'logo',
      title: 'Icon',
      type: 'localeCsodImage',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
      description: 'example: Subscription Highlights',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContentSection',
      description: '',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
    },
  ],
  preview: {
    select: {
      title: 'Subscription Fixed Side Bar',
      media: 'logo',
    },
  },
};
