import { suiteTypeField } from '../../../../sharedFields';
import { localizePreview } from '../../../../utils';

export default {
  name: 'suiteSectionItem',
  title: 'Product Category Section Item',
  type: 'object',
  fields: [
    suiteTypeField,
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'subheadingText',
      title: 'Subheading',
      type: 'localeString',
      validation: Rule => Rule.max(55).warning('A long message will make the menu drop down wider. 55 character maximum recommended.'),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
  ],
  preview: {
    select: {
      title: 'headingText',
      subtitle: 'subheadingText',
    },
    prepare: localizePreview(selection => selection),
  },
};
