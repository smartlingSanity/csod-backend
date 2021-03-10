import validation from '../utils/validation';
import { companyName } from '../sharedFields';
import { localizePreview } from '../utils';


export default {
  name: 'analystReport',
  title: 'Analyst Reports From Newsroom',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    companyName,
    {
      name: 'tileImage',
      title: 'Tile Image',
      type: 'localeCsodImage',
    },
    {
      name: 'pressReleasePage',
      title: 'Press Release Page',
      type: 'reference',
      to: [{ type: 'pressReleasePage' }],
    },
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'title',
      media: 'tileImage',
    },
    prepare: localizePreview(selection => selection),
  },
};
