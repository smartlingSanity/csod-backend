import { localizePreview } from '../../utils/index';

export default {
  name: 'statsTileCard',
  title: 'Stats Tile Card',
  type: 'object',
  description: 'A small stats card that display a customer image and logo',
  fields: [
    {
      name: 'statsHeading',
      title: 'Stats Heading',
      type: 'localeString',
    },
    {
      name: 'statsDescription',
      title: 'Stats Description',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
    {
      name: 'cardBackGroundcolor',
      title: 'Card Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Accent', value: 'accent' },
          { title: 'Primary', value: 'primary' },
          { title: 'Gray', value: 'gray' },
          { title: 'White', value: 'white' },
        ],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      title: 'statsHeading',
      subtitle: 'statsDescription',
    },
    prepare: localizePreview(selection => selection),
  },
};
