import client from 'part:@sanity/base/client';
import { localizePreview } from '../../utils';
import validation from '../../utils/validation';

export default {
  name: 'productEntity',
  title: 'Product Info',
  type: 'document',
  fields: [
    {
      name: 'csodId',
      title: 'ID',
      description: 'unique string used to identify the Product',
      type: 'string',
      readOnly: true,
      validation: Rule => [
        Rule.required().error('ID is required.'),
        Rule.custom(async (current, { document }) => {
          try {
            if (document) {
              const id = document._id.toString().replace('drafts.', '');
              const csodID = document.csodId.toString();
              const type = document._type.toString();
              const otherCsodIDs = await client.fetch(`//groq
              *[_type == "${type}" && csodId == "${csodID}" && !(_id match "drafts.${id}" || _id match "${id}" )]
              `);
              if (otherCsodIDs.length > 0) {
                return `This ID already in use by ${otherCsodIDs[0].displayName}`;
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
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      options: {
        list: [
          { title: 'Saba', value: 'saba' },
          { title: 'Cornerstone', value: 'cornerstone' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'displayName',
      title: 'Product Name',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale).error('Product Name is required.'),
    },
    {
      name: 'shortDescription',
      title: 'Short Product Description',
      description: 'Recommended maximum length of 140 characters',
      type: 'localeText',
      validation: Rule => Rule.max(140).warning('Maximum length of 140 characters.'),
    },
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'shortDescription',
      company: 'company',
    },
    prepare: localizePreview((productEntity) => {
      const title = productEntity.company && productEntity.title
        ? `${productEntity.title} (${productEntity.company})`
        : productEntity.title;

      return { title };
    }),
  },
};
