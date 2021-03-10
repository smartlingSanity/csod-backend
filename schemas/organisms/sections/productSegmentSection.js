import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils/index';

export default {
  name: 'productSegmentSection',
  title: 'Product Segment Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'types',
      title: 'Types',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'partnerType' }],
        },
      ],
    },
    {
      name: 'verticals',
      title: 'Verticals',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'partnerVertical' }],
        },
      ],
    },
    {
      name: 'partnerProductCategories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'partnerProductCategory' }],
        },
      ],
    },
    {
      name: 'regions',
      title: 'Regions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'region' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: '_type',
    },
    prepare: localizePreview(({ title, subtitle }) => ({
      title,
      subtitle,
    })),
  },
  component: SectionPreview,
};
