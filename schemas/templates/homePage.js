import {
  bubbleCtaField,
  bubbleCtaFieldInitialValue,
  routeField,
  sectionsDescription,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'homepage',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField(),
    {
      name: 'newsBarSection',
      title: 'News Bar Section',
      description: 'News bar at the top of page',
      type: 'reference',
      to: [{ type: 'newsBarSection' }],
    },
    {
      name: 'homePageBanner',
      title: 'Banner',
      type: 'homePageBanner',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'sectionsBelowBanner',
      title: 'Sections Below Homepage Banner',
      description: sectionsDescription,
      type: 'array',
      of: [
        { type: 'awardsSection' },
        { type: 'ctaCardsSection' },
        { type: 'oneColumnSection' },
        { type: 'tilesSection' },
        { type: 'twoColumnSection' },
      ],
    },
    {
      name: 'twoColumnSection',
      title: 'Two Column Section (Optional)',
      type: 'array',
      of: [{ type: 'twoColumnSection' }],
      validation: Rule => Rule.max(1),
    },
    {
      name: 'suitePathSection',
      title: 'Product Category Path Section',
      type: 'suitePathSection',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'clientCarouselSection',
      title: 'Client Carousel Section',
      type: 'clientCarouselSection',
      options: {
        collapsible: true,
      },
    },
    {
      title: 'Sections',
      name: 'sections',
      description: sectionsDescription,
      type: 'array',
      of: [{ type: 'ctaCardsSection' }],
    },
    bubbleCtaField,
  ],
  initialValue: {
    ...bubbleCtaFieldInitialValue,
  },
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
