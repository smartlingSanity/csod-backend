import { localizePreview } from '../utils';

export default {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    {
      name: 'partnerId',
      title: 'Partner Id',
      description: 'Used at hidden field for marketplace form',
      type: 'number',
    },
    {
      name: 'name',
      title: 'Name',
      description: 'Name of partner',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      description: 'Title to show on the page',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Short description of partner',
      type: 'localeText',
    },
    {
      name: 'isIntegratedPartner',
      title: 'Is Integrated?',
      description: 'Indicates if a partner is integrated',
      type: 'boolean',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'localeCsodImage',
    },
    {
      name: 'partnerTypes',
      title: 'Partner Types',
      description: 'Types where this partner is classified',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partnerType' }] }],
    },
    {
      name: 'partnerVerticals',
      title: 'Partner Verticals',
      description: 'Verticals where this partner is classified',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partnerVertical' }] }],
    },
    {
      name: 'regions',
      title: 'Partner Regions',
      description: 'Regions where this partner is classified',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'region' }] }],
    },
    {
      name: 'partnerProductCategories',
      title: 'Partner Product Categories',
      description: 'Product Categories where this partner is classified',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partnerProductCategory' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'logo',
    },
    prepare: localizePreview(selection => selection),
  },
};
