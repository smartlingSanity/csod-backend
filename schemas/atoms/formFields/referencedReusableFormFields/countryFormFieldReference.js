import { localizePreview } from '../../../utils';
import {
  emailOptIn,
  gdprCheckboxText,
  marketoFieldName,
  textLabel,
} from '../sharedFields';

export default {
  name: 'countryFormFieldReference',
  title: 'Country Form Field Reference',
  type: 'document',
  fields: [
    textLabel,
    marketoFieldName,
    gdprCheckboxText,
    emailOptIn,
  ],
  preview: {
    select: {
      title: 'textLabel',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
