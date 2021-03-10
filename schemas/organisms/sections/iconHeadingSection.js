// eslint-disable-next-line no-unused-vars
import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils';

export default {
  name: 'iconHeadingSection',
  title: 'Icon Heading Section',
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
      name: 'icon',
      title: 'Icon',
      description: 'A small icon displayed above the text block',
      type: 'localeCsodImage',
    },
    {
      name: 'align',
      title: 'Text Alignment',
      description: 'Choose if text will aligned left or center',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'headingTextColor',
      title: 'Heading Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Dark Gray', value: 'darkGray' },
          { title: 'White', value: 'white' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      media: 'icon',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title,
      media,
      subtitle,
      background,
    }) => ({
      title,
      media,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
