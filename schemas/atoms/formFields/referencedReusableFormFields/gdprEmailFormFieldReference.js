import {
  gdprCheckboxText,
  marketoFieldName,
  optional,
  placeholder,
  textLabel,
} from '../sharedFields';

export default {
  name: 'gdprEmailFormFieldReference',
  title: 'GDPR Email Input Form Field Reference',
  type: 'document',
  fields: [
    textLabel,
    marketoFieldName,
    placeholder,
    optional,
    gdprCheckboxText,
  ],
  preview: {
    select: {
      title: 'textLabel',
      subtitle: '_type',
    },
  },
};
