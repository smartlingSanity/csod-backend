import { localizePreview } from '../utils';
import validation from '../utils/validation';

export default {
  name: 'downloadAsset',
  title: 'Download Asset',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'localeString',
      description: 'Label to show in the download asset link',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'preview',
      title: 'Preview',
      type: 'image',
      description: 'Thumbnail of the asset',
      validation: Rule => Rule.required(),
    },
    {
      name: 'asset',
      title: 'Asset',
      type: 'localeFile',
      description: 'Asset containing the actual brochure',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
  ],
  preview: {
    select: {
      media: 'preview',
      title: 'label',
    },
    prepare: localizePreview(selection => selection),
  },
};
