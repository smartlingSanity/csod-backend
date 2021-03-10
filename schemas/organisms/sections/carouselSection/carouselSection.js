import SectionPreview from '../../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../../utils/index';

export default {
  name: 'carouselSection',
  title: 'Carousel Section',
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
      name: 'sectionSubHeading',
      title: 'Section Sub Heading',
      type: 'localeString',
    },
    {
      name: 'carouselCards',
      title: 'Carousel Cards',
      type: 'array',
      of: [{ type: 'carouselCard' }],
    },
    {
      name: 'footnote',
      title: 'Footnote',
      type: 'localeString',
      description: 'Optional text at the bottom of the carousel',
    },
  ],
  preview: {
    select: {
      title: 'sectionHeading',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
      media: 'carouselCards[0].carouselBg',
    },
    prepare: localizePreview(({
      title, subtitle, background, media,
    }) => ({
      title,
      subtitle,
      media,
      background,
    })),
    component: SectionPreview,
  },
};
