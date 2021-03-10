import { routeField, sectionsField, enabledLocaleField } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'partnerDetailPage',
  title: 'Partner Detail Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      tile: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField(),
    {
      name: 'partner',
      title: 'Partner',
      type: 'reference',
      to: { type: 'partner' },
    },
    sectionsField(
      [
        'carouselSection',
        'iconGridSection',
        'oneColumnSection',
        'productSegmentSection',
        'tilesSection',
        'twoColumnSection',
      ],
      ['slantBanner'],
    ),
    {
      name: 'bubbleCta',
      title: 'Bubble CTA',
      type: 'bubbleCtaReference1',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
