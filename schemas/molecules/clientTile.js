import { localizePreview } from '../utils/index';

export default {
  name: 'clientTile',
  title: 'Customer Tile',
  type: 'object',
  description: 'A small customer card that display a client image and logo',
  fields: [
    {
      name: 'displayName',
      title: 'Display Name',
      type: 'localeString',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'clientLogo',
      title: 'Circle company logo',
      type: 'localeCsodImage',
    },
    {
      name: 'clientTileImage',
      title: 'Client background image',
      type: 'localeCsodImage',
    },
    {
      name: 'animatedButton',
      title: 'Animated Button',
      type: 'animatedButton',
    },
    {
      name: 'videoButton',
      title: 'Video Button',
      type: 'videoButton',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'clientLogo',
    },
    prepare: localizePreview(selection => selection),
  },
};
