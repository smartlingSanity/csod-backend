import { localizePreview } from '../utils/index';

export default {
  name: 'companyDescription',
  title: 'Company Description',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the company, used only in Sanity',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title to show before the description at render, following the format: About [Name of the company].',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Description of the company to be shown.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
