import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils/index';

export default {
  name: 'radialIconSection',
  title: 'Radial Icon Section',
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
      name: 'textBlock',
      title: 'Text Block',
      type: 'textBlock',
    },
    {
      name: 'radialIconCenterLogo',
      title: 'Center Logo',
      description: 'Radial Icon Logo at center of section',
      type: 'localeCsodImage',
    },
    {
      title: 'Radial Icons',
      name: 'radialIcons',
      description: 'Company logo that is displayed in the Radial Icon',
      type: 'array',
      of: [{ type: 'localeCsodImage' }],
      validation: Rule => Rule.required()
        .custom(radialIcons => (radialIcons.length === 8 ? true : 'Exactly 8 clients logos for the Radial Icon Section')),
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: '_type',
      media: 'radialIconCenterLogo',
    },
    prepare: localizePreview(({
      title,
      media,
      subtitle,
      background,
    }) => ({
      title,
      media,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
