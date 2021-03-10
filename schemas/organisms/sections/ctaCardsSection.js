import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils';

export default {
  name: 'ctaCardsSection',
  title: 'Cta Cards Section',
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
      title: 'Background Image',
      type: 'localeCsodImage',
    },
    {
      name: 'ctaCards',
      title: 'Cta Cards',
      type: 'array',
      of: [{ type: 'ctaCard' }],
      validation: Rule => Rule.max(8).error('A maximum of 8 CTA Cards are allowed'),
    },
  ],
  preview: {
    select: {
      title: 'ctaCards[0].heading',
      media: 'ctaCards[0].image',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title, media, subtitle, background,
    }) => ({
      title,
      media,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
