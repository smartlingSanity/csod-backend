/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import client from 'part:@sanity/base/client';

export default {
  name: 'clientEntity',
  title: 'Client Info',
  type: 'document',
  fields: [
    {
      name: 'csodId',
      title: 'ID',
      description: 'unique string used to identify the Client',
      type: 'string',
      readOnly: true,
      validation: Rule => [
        Rule.required().error('ID is required.'),
        Rule.custom(async (current, context) => {
          try {
            if (context) {
              const id = context.document._id.toString().replace('drafts.', '');
              const csodID = context.document.csodId.toString();
              const type = context.document._type.toString();
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
      name: 'displayName',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required().error('Client Name is required.'),
    },
    {
      name: 'clientLogoColor',
      title: 'Colored Client Logo',
      description: 'Client’s main company logo that is used globally across the site. Recommended Image Dimensions: 450 x 450',
      type: 'csodImage',
    },
    {
      name: 'clientLogoWhite',
      title: 'White Client Logo used in client Quote Logo Slider',
      description: 'Recommended Image Dimensions: 140 X 140 [square], 140 X 120 [rectangular]',
      type: 'csodImage',
    },
    {
      name: 'clientLogoCarouselNav',
      title: 'Client Logo for the Client Carousel Section NavBar',
      description: 'Image used for the logo navbar above the Client Carousel Section',
      type: 'csodImage',
    },
    {
      name: 'quotes',
      title: 'Client Quotes',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Quotes',
          to: [{ type: 'quoteEntity' }],
        }],
    },
    {
      name: 'clientIndustries',
      title: 'Industry that the client belongs too',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Industries',
          to: [{ type: 'industryEntity' }],
        }],
    },
    {
      name: 'clientProducts',
      title: 'Products',
      description: 'Products used by this client',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Products',
          to: [{ type: 'productEntity' }],
        }],
    },
  ],
  preview: {
    select: {
      title: 'displayName',
      media: 'clientLogoColor',
    },
  },
};
