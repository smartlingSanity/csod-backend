import client from 'part:@sanity/base/client'; /* eslint-disable-line */
import { localizePreview } from '../utils';

export default {
  name: 'marketoEmbeddedForm',
  title: 'Marketo Embedded Form',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'marketoFormId',
      title: 'Form Id ',
      description: 'The number assigned to the form in Marketo (eg 6153)',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'thankYouPage',
      title: 'Thank You Page',
      type: 'reference',
      to: [{ type: 'thankYouPage' }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'marketoFormId',
    },
    prepare: localizePreview(selection => selection),
  },
};
