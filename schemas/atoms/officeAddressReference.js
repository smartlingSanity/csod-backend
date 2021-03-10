import { localizePreview } from '../utils/index';

export default {
  name: 'officeAddressReference',
  title: 'Office Address Reference',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title used for referencing address within Sanity - not displayed on site',
      validation: Rule => Rule.required().error('Title is required'),
    },
    {
      name: 'streetAddress',
      title: 'Street Address',
      type: 'localeBlockContent',
      description: 'Include street address',
      validation: Rule => Rule.required().error('Street Address is required'),
    },
    {
      name: 'mapLink',
      title: 'Map Link',
      type: 'link',
      description: 'Link to office location on Google Maps. Suggested title: MAP',
    },
    {
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'localeBlockContent',
      description: 'Phone number(s) and email address(es) for this office. Use `tel:` and `mailto:` links.',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
