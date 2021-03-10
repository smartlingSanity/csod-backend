import { localizePreview } from '../utils/index';

export default {
  name: 'industryFixedSideBar',
  title: 'Industry Fixed Side Bar',
  type: 'object',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'localeCsodImage',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'align',
      title: 'Alignment',
      description: 'Choose if the heading will be aligned left or center',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'logos',
      title: 'Related Clients',
      type: 'array',
      of: [{ type: 'localeCsodImage' }],
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      media: 'logo',
    },
    prepare: localizePreview(selection => selection),
  },
};
