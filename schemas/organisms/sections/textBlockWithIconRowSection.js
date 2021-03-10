import { localizePreview } from '../../utils';

export default {
  name: 'textBlockWithIconRowSection',
  title: 'Text Block With Icon Row Section',
  type: 'object',
  description: 'A section that contains a TextBlock and IconGridSection',
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
      name: 'iconGridSection',
      title: 'Icon Grid Section',
      type: 'iconGridSection',
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      altTitle: 'textBlock.description',
      subtitle: '_type',
      media: 'backgroundImage',
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
