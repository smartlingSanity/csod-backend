import { localizePreview } from '../utils/index';

export default {
  name: 'officeRegionSection',
  title: 'Office Region Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Region',
      type: 'localeString',
      description: 'Name of region (Europe, Middle East and Africa, Latin America, etc.)',
      validation: Rule => Rule.required().error('Region is required'),
    },
    {
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        { type: 'officeLocationTile' },
      ],
      validation: Rule => Rule.required().min(1).error('At least one location is required'),
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: localizePreview(selection => selection),
  },
};
