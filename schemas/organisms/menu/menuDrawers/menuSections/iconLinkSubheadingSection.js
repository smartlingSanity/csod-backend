import { localizePreview } from '../../../../utils';

export default {
  name: 'iconLinkSubheadingSection',
  title: 'Icon Link Subheading Section',
  type: 'object',
  fields: [
    {
      name: 'menuSectionConfig',
      title: 'Section Config',
      type: 'menuSectionConfig',
    },
    {
      name: 'iconLinkSubheadings',
      title: 'Icon Link Subheadings',
      type: 'array',
      of: [
        {
          title: 'Icon Link Subheading',
          type: 'iconLinkSubheading',
        },
      ],
    },

  ],
  preview: {
    select: {
      title: 'menuSectionConfig.sectionName',
    },
    prepare: localizePreview(selection => selection),
  },
};
