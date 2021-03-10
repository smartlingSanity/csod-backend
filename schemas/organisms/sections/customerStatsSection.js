import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { pageDimensions } from '../../../../frontend/src/styles/base';

export default {
  name: 'customerStatsSection',
  title: 'Customer Stats Section',
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
      name: 'backgroundImage',
      title: 'Full Background Image',
      description: `A background image that spans the full width (${pageDimensions.rawLargeDesktopWidth}px) of the page.`,
      type: 'csodImage',
    },
    {
      name: 'headingText',
      title: 'Client Stats',
      type: 'string',
      description: 'ie: 3,500+',
    },
    {
      name: 'subheadingText',
      title: 'Text below stats',
      type: 'string',
      description: 'ie: global clients',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      media: 'backgroundImage',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare({
      title, media, subtitle, background,
    }) {
      return {
        title,
        media,
        subtitle,
        background,
      };
    },
    component: SectionPreview,
  },
};
