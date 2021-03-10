import { localizePreview } from '../../utils';

export default {
  name: 'reusableFormField',
  title: 'Reusable Form Field',
  type: 'object',
  fields: [
    {
      name: 'formFieldReference',
      type: 'reference',
      to: [
        { type: 'checkBoxFormFieldReference' },
        { type: 'countryFormFieldReference' },
        { type: 'dropdownFormFieldReference' },
        { type: 'emailInputFormFieldReference' },
        { type: 'textAreaFormFieldReference' },
        { type: 'textInputFormFieldReference' },
      ],
      options: {
        collapsible: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'formFieldReference.textLabel',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
