import { localizePreview } from '../../../utils';

export default {
  name: 'statsCounter',
  title: 'Stats Counter',
  type: 'object',
  description: 'Make a animated stat counter',
  fields: [
    {
      name: 'prefixText',
      title: 'Prefix',
      type: 'localeString',
      description: 'Optional word that will be added before the number',
    },
    {
      name: 'statsNumber',
      title: 'Stats Number',
      type: 'number',
    },
    {
      name: 'suffixText',
      title: 'Suffix',
      type: 'string',
      options: {
        list: [
          { title: 'Percent (default)', value: '%' },
          { title: 'Millions', value: 'M' },
          { title: 'Times', value: 'x' },
        ],
        layout: 'list',
      },
      description: 'Value number is representing (e.g. percent or millions)',
    },
    {
      name: 'subheadingText',
      title: 'Subheading',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
  ],
  preview: {
    select: {
      title: 'description',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
