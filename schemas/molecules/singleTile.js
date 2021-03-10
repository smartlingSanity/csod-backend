import { localizePreview } from '../utils/index';

export default {
  name: 'singleTile',
  title: 'Single Tile',
  type: 'object',
  description: 'A small tile card that can display img + text',
  fields: [
    {
      name: 'displayName',
      title: 'Display Name',
      type: 'localeString',
    },
    {
      name: 'singleTileImage',
      title: 'Image at the top of tile',
      type: 'localeCsodImage',
    },
    {
      name: 'clientQuote',
      title: 'Quote',
      type: 'localeText',
    },
    {
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'localeString',
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      title: 'displayName',
      media: 'singleTileImage',
    },
    prepare: localizePreview(selection => selection),
  },
};
