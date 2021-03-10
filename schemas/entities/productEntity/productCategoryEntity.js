import client from 'part:@sanity/base/client';
import { routeField } from '../../sharedFields';
import { localizePreview } from '../../utils';

export default {
  name: 'productCategoryEntity',
  title: 'Product Categories',
  type: 'document',
  fields: [
    {
      name: 'csodId',
      title: 'ID',
      description: 'Unique string used to identify the category',
      type: 'string',
      readOnly: true,
      validation: Rule => Rule.required().error('ID is required.'),
    },
    {
      name: 'displayName',
      title: 'Category Name',
      type: 'localeString',
      validation: Rule => Rule.required().error('Category Name is required.'),
    },
    {
      name: 'shortDescription',
      title: 'Description',
      description: 'Recommended maximum length of 140 characters',
      type: 'localeText',
      validation: Rule => Rule.max(140).warning('Maximum length of 140 characters.'),
    },
    {
      name: 'linkWithoutTitle',
      title: 'Link',
      description: 'url to product category page. Internal link only.',
      type: 'linkWithoutTitle',
      validation: Rule => [
        Rule.required(),
        Rule.custom((current, context) => {
          if (current.link[0]._type === 'externalLink' && context.document._type.toLowerCase().includes('entity')) return 'Please choose an internal link for Entity links';
          return true;
        }),
      ],
    },
    {
      name: 'products',
      title: 'Products within this Category',
      description: 'Products that belong to this Category',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Products',
          to: [{ type: 'productEntity' }],
        }],
    },
    {
      name: 'productOrdering',
      title: 'Product Ordering',
      type: 'string',
      options: {
        list: [
          { title: '1', value: '1' },
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
          { title: '5', value: '5' },
          { title: '6', value: '6' },
          { title: '7', value: '7' },
          { title: '8', value: '8' },
          { title: '9', value: '9' },
          { title: '10', value: '10' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => [
        Rule.custom(async (current, context) => {
          try {
            if (context) {
              const currentDocId = context.document._id.toString().replace('drafts.', '');
              const duplicateOrderingSelection = await client.fetch(`//groq
              *[_type == "productCategoryEntity" && _id != "${currentDocId}" && !(_id in path("drafts.**"))].productOrdering
              `);
              if (duplicateOrderingSelection.includes(current)) {
                return 'This Product Ordering has already been selected, please select another';
              }
              return true;
            }
            return 'Required';
          } catch (error) {
            return error.message;
          }
        }),
      ],
    },
  ],
  orderings: [
    {
      title: 'Product Ordering Ascending',
      name: 'productOrderingAscending',
      by: [{ field: 'productOrdering', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'shortDescription',
      order: 'productOrdering',
    },
    prepare: localizePreview((productCategoryEntity) => {
      const subtitle = productCategoryEntity.order && productCategoryEntity.title
        ? `Product display order: ${productCategoryEntity.order}`
        : productCategoryEntity.subtitle;
      const { title } = productCategoryEntity;

      return { title, subtitle };
    }),
  },
};
