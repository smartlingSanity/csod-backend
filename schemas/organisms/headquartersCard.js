import { localizePreview } from '../utils';

export default {
  name: 'headquartersCard',
  title: 'Headquarters Card',
  type: 'object',
  fieldsets: [
    {
      name: 'leftColumn',
      title: 'Left Column',
      description: 'Fields that display in the left column',
    },
    {
      name: 'rightColumn',
      title: 'Right Column',
      description: 'Field that displays in the right column',
    },
  ],
  fields: [
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
      fieldset: 'leftColumn',
    },
    {
      name: 'streetAddress',
      title: 'Street Address',
      type: 'localeBlockContent',
      description: 'Include street address, map link, and phone numbers',
      fieldset: 'leftColumn',
    },
    {
      name: 'animatedButton',
      title: 'Animated Button',
      type: 'animatedButton',
      fieldset: 'leftColumn',
    },
    {
      name: 'contactList',
      title: 'Contact List',
      type: 'localeBlockContent',
      fieldset: 'rightColumn',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
    },
    prepare: localizePreview(selection => selection),
  },
};
