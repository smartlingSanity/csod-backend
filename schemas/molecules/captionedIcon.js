import { localizePreview } from '../utils';

export default {
  name: 'captionedIcon',
  title: 'Captioned Icon',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon Imaqe',
      type: 'localeCsodImage',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'icon',
    },
    prepare: localizePreview(selection => selection),
  },
};
