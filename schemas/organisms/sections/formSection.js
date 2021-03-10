import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils';

export default {
  name: 'formSection',
  title: 'Form Section',
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
      name: 'form',
      title: 'Form',
      description: 'Choose CSOD Form or Marketo Embedded Form',
      type: 'array',
      of: [
        { type: 'form' }, { type: 'marketoEmbeddedForm' },
      ],
      validation: Rule => Rule.custom(form => (form.length > 1 ? 'You can only add one form' : true)),
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Text adjacent to the form',
      type: 'localeBlockContent',
    },
    {
      name: 'formPosition',
      title: 'Form Position',
      description: 'If the form should be on the left or right of the text (default: left)',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      title: 'form[0].title',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({ title, subtitle, background }) => ({
      title,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
