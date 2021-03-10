import { localizePreview } from '../utils/index';

export default {
  name: 'clientQuote',
  title: 'Customer Quote',
  type: 'object',
  fields: [
    {
      name: 'clientLogo',
      title: 'Customer Logo',
      description: 'Add company logo if quote is from a company - leave blank if quote is from an individual.',
      type: 'localeCsodImage',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'localeString',
    },
    {
      name: 'attribution',
      title: 'Attribution',
      description: 'Add attribution if quote is from an individual - leave blank if quote is from a company.',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'attribution',
      media: 'clientLogo',
    },
    prepare: localizePreview(selection => selection),
  },
};
