import client from 'part:@sanity/base/client';
import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';

/* eslint-disable import/no-unresolved */
import { getLocale } from '../../../config/intlConfig';
import { localizePreview } from '../../utils';

export default {
  name: 'clientTileSection',
  title: 'Customer Tile Section',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'localeString',
    },
    {
      name: 'clientTiles',
      title: 'Customer Tiles',
      type: 'array',
      of: [
        { type: 'clientTile' },
        { type: 'clientTileV1' },
        { type: 'statsTile' },
        { type: 'singleTile' },
      ],
      validation: Rule => Rule.custom((sections, context) => {
        if (context.document._type === 'clientPage') return true;
        const { dataset } = client.config();
        const clientTileDetected = sections.filter(section => section._type === 'clientTile')
          .length > 0;
        return getLocale(dataset) === 'us' && clientTileDetected
          ? 'Client Tile is disabled on US dataset, please use Client Tile V1 instead'
          : true;
      }),
    },
  ],
  preview: {
    select: {
      title: 'sectionHeading',
      subtitle: '_type',
      media: 'clientTiles[0].clientLogo',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title = 'Customer Tile Section',
      subtitle,
      media,
      background,
    }) => ({
      title,
      subtitle,
      media,
      background,
    })),
    component: SectionPreview,
  },
};
