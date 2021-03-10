import { localizePreview } from '../utils';

export default {
  name: 'shareWidget',
  title: 'Share Widget',
  type: 'document',
  description: 'Contains different social medias to share a url',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Identifies filter menus across i18n datasets',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title to be displayed at the UI',
    },
    {
      name: 'socialMedias',
      title: 'Social Medias',
      description: 'List of social media this widget will display',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'socialMedia' }] }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
    },
    prepare: localizePreview(selection => selection),
  },
};
