import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils';

export default {
  name: 'threeCardSection',
  title: 'Three Card Section',
  description: 'Text is the category, heading is the card title',
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
      name: 'headingText',
      title: 'Heading Text',
      type: 'localeString',
    },
    {
      name: 'ctaCards',
      title: 'Three Card Section',
      type: 'array',
      of: [{ type: 'ctaCard' }],
      validation: Rule => Rule.max(3).error('A maximum of 3 CTA Cards are allowed'),
    },
  ],
  preview: {
    select: {
      headingText: 'headingText',
      heading: 'ctaCards[0].heading',
      media: 'ctaCards[0].image',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      headingText,
      heading,
      media,
      subtitle,
      background,
    }) => ({
      title: headingText || heading,
      media,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
