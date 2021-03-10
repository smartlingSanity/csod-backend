import { localizePreview } from '../../../utils';

export default {
  name: 'menuDrawer',
  title: 'Menu Drawer',
  type: 'object',
  fields: [
    {
      name: 'menuDrawerName',
      title: 'Menu Drawer Name',
      type: 'localeString',
    },
    {
      name: 'menuSections',
      title: 'Menu Sections',
      type: 'array',
      of: [
        {
          title: 'Product Category Section',
          type: 'productCategorySection',
        },
        {
          title: 'Product Category Section',
          type: 'suiteSection',
        },
        {
          title: 'Inline Link Section',
          type: 'inlineLinkSection',
        },
        {
          title: 'Industry Section',
          type: 'industrySection',
        },
        {
          title: 'Icon Link Section',
          type: 'iconLinkSection',
        },
        {
          title: 'Grouped Link Section',
          type: 'groupedLinkSection',
        },
        {
          title: 'Icon Link Subheading Section',
          type: 'iconLinkSubheadingSection',
        },
        {
          title: 'Quote Section',
          type: 'menuQuoteSection',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'menuDrawerName',
    },
    prepare: localizePreview(selection => selection),
  },
};
