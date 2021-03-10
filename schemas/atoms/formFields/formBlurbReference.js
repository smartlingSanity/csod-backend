import { localizePreview } from '../../utils';

export default {
  name: 'formBlurbReference',
  title: 'Form Blurb',
  type: 'document',
  fields: [
    {
      name: 'blurbId',
      title: 'Blurb Id',
      description: 'This is used to query this blurb from the code',
      readOnly: true,
      type: 'string',
    },
    {
      name: 'blurbHeading',
      title: 'Blurb Heading',
      description: 'eg, We have answers for you',
      type: 'localeString',
    },
    {
      name: 'blurbBody',
      title: 'Blurb Body',
      description: 'Include our phone number and email',
      type: 'localeBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'blurbHeading',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
