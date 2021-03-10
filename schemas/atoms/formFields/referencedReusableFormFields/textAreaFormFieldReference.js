import { localizePreview } from '../../../utils';
import {
  marketoFieldName,
  optional,
  placeholder,
  textLabel,
} from '../sharedFields';

export default {
  name: 'textAreaFormFieldReference',
  title: 'Text Area Form Field Reference',
  type: 'document',
  fields: [
    textLabel,
    marketoFieldName,
    placeholder,
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
