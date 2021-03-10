import { suiteTypeField } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'suiteTextBlock',
  title: 'Product Category Text Block',
  type: 'object',
  description: 'A block that contains a suite icon, description, and a button',
  fields: [
    suiteTypeField,
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'array',
      of: [
        { type: 'button' },
        { type: 'videoButton' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      altTitle: 'description',
      subtitle: '_type',
      media: 'icon',
    },
    prepare: localizePreview((selection) => {
      const {
        title, altTitle, subtitle, media,
      } = selection;

      const titleToShow = title || altTitle;

      return {
        title: titleToShow,
        subtitle,
        media,
      };
    }),
  },
};
