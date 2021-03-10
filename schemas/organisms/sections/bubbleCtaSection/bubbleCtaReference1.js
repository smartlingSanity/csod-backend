import { localizePreview } from '../../../utils';
import validation from '../../../utils/validation';

export default {
  name: 'bubbleCtaReference1',
  title: 'Bubble Cta',
  type: 'document',
  i18n: true,
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
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'localeText',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: localizePreview(selection => selection),
  },
};
