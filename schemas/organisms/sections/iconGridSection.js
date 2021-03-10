import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils/index';

export default {
  name: 'iconGridSection',
  title: 'Icon Grid Section',
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
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'localeCsodImage',
    },
    {
      name: 'iconSize',
      title: 'Icons Size',
      type: 'number',
      description: 'Size for all icons in the grid (px)',
    },
    {
      name: 'icons',
      title: 'Icons',
      type: 'array',
      of: [{ type: 'captionedIcon' }],
      validation: rule => [
        rule.min(1).error('A minimum of 1 icon is required.'),
      ],
    },
  ],
  preview: {
    select: {
      icons: 'icons',
      title: 'heading',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({ icons, title, background }) => {
      const totalIcons = icons.length;
      return {
        title: 'Icon Grid Section',
        subtitle: `(${totalIcons} Icons) ${title}.`,
        background,
      };
    }),
    component: SectionPreview,
  },
};
