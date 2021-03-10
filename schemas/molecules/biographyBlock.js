import { localizePreview } from '../utils';

export default {
  name: 'biographyBlock',
  title: 'Biography Block',
  type: 'object',
  fields: [
    {
      name: 'headshot',
      title: 'Headshot / Icon',
      type: 'localeCsodImage',
    },
    {
      name: 'name',
      title: 'Name / Heading',
      type: 'localeString',
    },
    {
      name: 'jobTitle',
      title: 'Job Title / Subheading',
      type: 'localeString',
    },
    {
      name: 'biography',
      title: 'Biography / Description',
      type: 'localeText',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'headshot',
    },
    prepare: localizePreview(selection => selection),
  },
};
