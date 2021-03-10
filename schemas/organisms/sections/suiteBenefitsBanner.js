import { localizePreview } from '../../utils';

export default {
  name: 'suiteBenefitsBanner',
  title: 'Product Category Benefits Banner',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
