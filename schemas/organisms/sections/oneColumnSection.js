import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { parseAsset } from '../../../src/components/SectionPreview/helpers';
import { localizePreview } from '../../utils/index';

export default {
  name: 'oneColumnSection',
  title: 'One Column Section',
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
      name: 'imageOrProductScreen',
      title: 'Image or Product Screen Animation',
      description:
        'This will replace the above field after we launch. This field overrides the above field.',
      type: 'array',
      of: [{ type: 'localeCsodImage' }, { type: 'productScreenAnimation' }],
      validation: Rule => Rule.max(1).error('A maximum of 1 is allowed'),
    },
    {
      name: 'backgroundImage',
      title: 'Full Background Image',
      description: 'A background image that spans the full width of the page',
      type: 'localeCsodImage',
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: '_type',
      imageOrProductScreen: 'imageOrProductScreen',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title, subtitle, imageOrProductScreen, background,
    }) => ({
      title,
      subtitle,
      media: parseAsset(imageOrProductScreen),
      background,
    })),
    component: SectionPreview,
  },
};
