import { localizePreview } from '../../../utils';
import {
  marketoFieldName,
  optional,
  textBlock,
  textLabel,
} from '../sharedFields';

export default {
  name: 'checkBoxFormFieldReference',
  title: 'Check Box Form Field Reference',
  type: 'document',
  fields: [
    marketoFieldName,
    optional,
    textBlock,
    textLabel,
  ],
  preview: {
    select: {
      title: 'textLabel',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
