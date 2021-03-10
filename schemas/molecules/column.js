import { localizePreview } from '../utils/index';

export default {
  name: 'csodColumn',
  title: 'Column',
  type: 'object',
  fieldsets: [
    {
      name: 'verticalAlignFields',
      title: 'Vertical Alignment',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'columnBlocks',
      title: 'Blocks',
      type: 'array',
      of: [
        { type: 'csodImage' },
        { type: 'localeCsodImage' },
        { type: 'downloadAsset' },
        { type: 'inlineVideo' },
        { type: 'productScreenAnimation' },
        { type: 'textBlock' },
        { type: 'textBlockContent' },
        { type: 'textBlockWithIconRowSection' },
      ],
    },
    {
      name: 'align',
      title: 'Align to edge?',
      description: 'Use only if you wish the items inside the column to align flush against the side of the page',
      type: 'boolean',
    },
    {
      name: 'columnAlign',
      title: 'Column Align',
      description: 'Choose how to align the content within the column (not images)',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Default (Center)', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      media: 'localeCsodImage',
    },
    prepare: localizePreview(selection => selection),
  },
};
