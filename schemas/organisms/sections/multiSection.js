import { localizePreview } from '../../utils';

export default {
  name: 'multiSection',
  title: 'Multi Section',
  type: 'object',
  description: 'Container for adding multiple sections. Adding an image will have it span the size of the container',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsable: true,
      },
    },
    {
      name: 'backgroundImage',
      title: 'Full Background Image',
      description: 'A background image that spans the container',
      type: 'localeCsodImage',
    },
    {
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        { type: 'awardsSection' },
        { type: 'blockContentSection' },
        { type: 'bubbleCtaSection1' },
        { type: 'carouselSection' },
        { type: 'clientCarouselCard' },
        { type: 'clientCarouselSection' },
        { type: 'clientCarouselSectionV1' },
        { type: 'clientTileSection' },
        { type: 'ctaCardsSection' },
        { type: 'gradientCard' },
        { type: 'gtmSection' },
        { type: 'iconGridSection' },
        { type: 'iconHeadingSection' },
        { type: 'iconTextBlockSection' },
        { type: 'oneColumnSection' },
        { type: 'quoteGradientCard' },
        { type: 'quoteLogoSlider' },
        { type: 'quoteLogoSliderV1' },
        { type: 'radialIconSection' },
        { type: 'suiteBannerSection' },
        { type: 'slantBanner' },
        { type: 'statsCounterSection' },
        { type: 'suiteCards' },
        { type: 'suiteIconGridSection' },
        { type: 'threeCardSection' },
        { type: 'twoColumnSection' },
        { type: 'twoColumnTextSection' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'sections.length',
      subtitle: 'sections',
      media: 'backgroundImage',
    },
    prepare: localizePreview(({ sections, media }) => {
      const sectionTypes = Array.isArray(sections) ? sections.map(section => section._type) : [];

      return {
        title: `Multi Section (${sectionTypes.length} sections) `,
        subtitle: sectionTypes.join(', '),
        media,
      };
    }),
  },
};
