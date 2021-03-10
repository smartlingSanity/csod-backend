import { localizePreview } from '../../../../utils/index';

export default {
  name: 'menuQuoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
    {
      name: 'logoImage',
      title: 'Logo',
      type: 'localeCsodImage',
    },
    {
      name: 'personImage',
      title: 'Person Image',
      type: 'localeCsodImage',
    },
    {
      name: 'quoteText',
      title: 'Quote Text',
      type: 'localeString',
    },
    {
      name: 'attribution',
      title: 'Quote Attribution',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },

  ],
  preview: {
    select: {
      title: 'menuSectionConfig.sectionName',
    },
    prepare: localizePreview(selection => selection),
  },
};
