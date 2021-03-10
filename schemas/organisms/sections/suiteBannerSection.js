import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils/index';
import { parseAsset } from '../../../src/components/SectionPreview/helpers';

export default {
  name: 'suiteBannerSection',
  title: 'Product Category Banner Section',
  type: 'object',
  fields: [
    {
      name: 'textBlock',
      title: 'Banner Text',
      type: 'textBlock',
    },
    {
      name: 'imageOrProductScreen',
      title: 'Image or Product Screen Animation',
      description: 'This will replace the above field after we launch. This field overrides the above field.',
      type: 'array',
      of: [
        { type: 'localeCsodImage' },
        { type: 'productScreenAnimation' },
      ],
      validation: Rule => Rule.max(1).error('A maximum of 1 is allowed'),
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: '_type',
      imageOrProductScreen: 'imageOrProductScreen',
    },
    prepare: localizePreview(({
      title, subtitle, imageOrProductScreen,
    }) => ({
      title,
      subtitle,
      media: parseAsset(imageOrProductScreen),
    })),
    component: SectionPreview,
  },
};
