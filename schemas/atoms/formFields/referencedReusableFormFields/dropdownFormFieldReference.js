import { localizePreview } from '../../../utils';
import {
  marketoFieldName,
  optional,
  placeholder,
  textLabel,
} from '../sharedFields';

export default {
  name: 'dropdownFormFieldReference',
  title: 'Dropdown Form Field Reference',
  type: 'document',
  fields: [
    textLabel,
    marketoFieldName,
    placeholder,
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'option' }],
      validation: Rule => Rule.min(1).error('You must add at least one option'),
    },
    optional,
  ],
  preview: {
    select: {
      title: 'textLabel',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
