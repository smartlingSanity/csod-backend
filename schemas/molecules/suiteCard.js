import { suiteTypeField } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'suiteCard',
  title: 'Product Category Card',
  type: 'object',
  fields: [
    {
      name: 'suiteCardLink',
      title: 'Link To',
      type: 'link',
    },
    suiteTypeField,
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'localeCsodImage',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'subheading',
      title: 'Sub-Heading',
      type: 'localeString',
    },
    {
      title: 'Product Category Card Bottom Section',
      name: 'suiteCardBottomSection',
      type: 'array',
      of: [
        { type: 'list' },
        { type: 'suiteCardQuote' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'avatar',
    },
    prepare: localizePreview(selection => selection),
  },
};
