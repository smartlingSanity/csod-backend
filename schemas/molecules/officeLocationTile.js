import { localizePreview } from '../utils';

export default {
  name: 'officeLocationTile',
  title: 'Office Location Tile',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      description: 'City, State, Country, or Region that identifies office location (New York, Germany, Southeast Asia, etc.)',
      validation: Rule => Rule.required().error('Heading is required'),
    },
    {
      name: 'addresses',
      title: 'Addresses',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'officeAddressReference' },
          ],
        },
      ],
      validation: Rule => Rule.required().min(1).error('At least one address is required'),
    },
    {
      name: 'localSiteLink',
      title: 'Local Site Link',
      type: 'link',
      description: 'Link to the local CSOD site',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: localizePreview(selection => selection),
  },
};
