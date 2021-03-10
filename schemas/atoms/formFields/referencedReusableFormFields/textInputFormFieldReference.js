import { localizePreview } from '../../../utils';
import {
  marketoFieldName,
  optional,
  placeholder,
  textLabel,
} from '../sharedFields';

export default {
  name: 'textInputFormFieldReference',
  title: 'Text Input Form Field Reference',
  type: 'document',
  fields: [textLabel, marketoFieldName, placeholder, optional],
  preview: {
    select: {
      title: 'textLabel',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
