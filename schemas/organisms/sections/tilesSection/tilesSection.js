import SectionPreview from '../../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../../utils/index';

export default {
  name: 'tilesSection',
  title: 'Tiles Section',
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
      name: 'useShortTiles',
      title: 'Use Short Tiles',
      description: 'Use short version of link tiles (defaults to false)',
      type: 'boolean',
    },
    {
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      of: [
        { type: 'linkTile' },
        { type: 'videoTile' },
        { type: 'fullImageTile' },
        { type: 'personTile' },
      ],
    },
  ],
  preview: {
    select: {
      sectionHeading: 'sectionHeading',
      subheading: '_type',
      tiles: 'tiles',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      sectionHeading, subheading, background, tiles,
    }) => {
      const displayTitle = sectionHeading || `Untitled Tiles Section (${tiles.length} tiles)`;
      let media;
      switch (tiles[0]._type) {
        case 'linkTile':
          media = tiles[0].tileImage;
          break;
        case 'videoTile':
          media = tiles[0].video.thumbnail;
          break;
        case 'fullImageTile':
          media = tiles[0].bgImage;
          break;
        case 'personTile':
          media = tiles[0].person.image;
          break;
        default:
          media = '';
          break;
      }

      return {
        title: displayTitle,
        subtitle: subheading,
        media,
        background,
      };
    }),
    component: SectionPreview,
  },
};
