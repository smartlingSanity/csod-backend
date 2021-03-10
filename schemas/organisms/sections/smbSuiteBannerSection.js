import { localizePreview } from '../../utils';

export default {
  name: 'smbSuiteBannerSection',
  title: 'SMB Product Category Banner Section',
  type: 'object',
  fields: [
    {
      name: 'preTitle',
      title: 'PreTitle',
      type: 'localeString',
    },
    {
      name: 'textBlock',
      title: 'Banner Text',
      type: 'textBlock',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'localeCsodImage',
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
    },
    prepare: localizePreview(selection => selection),
  },
};
