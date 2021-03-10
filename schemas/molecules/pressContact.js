import { localizePreview } from '../utils/index';

export default {
  name: 'pressContact',
  title: 'Press Contacts',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      description: 'e.g. Deaira Irons',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'e.g. Media Contact',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'localeString',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'localeString',
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
