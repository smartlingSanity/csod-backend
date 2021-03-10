import SectionPreview from '../../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../../utils';

export default {
  name: 'clientCarouselSection',
  title: 'Customer Carousel Section',
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
      name: 'carouselClients',
      title: 'Carousel Customer',
      type: 'array',
      of: [{ type: 'clientCarouselCard' }],
    },
  ],
  preview: {
    select: {
      title: 'sectionHeading',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
      carouselClients: 'carouselClients',
    },
    prepare: localizePreview(({
      title, subtitle, background, carouselClients,
    }) => {
      const media = carouselClients[0].clientLogo || '';
      return {
        title,
        subtitle,
        background,
        media,
      };
    }),
    component: SectionPreview,
  },
};
