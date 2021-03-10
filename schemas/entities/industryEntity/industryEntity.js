import client from 'part:@sanity/base/client';

export default {
  name: 'industryEntity',
  title: 'Industry',
  type: 'document',
  fields: [
    {
      name: 'csodId',
      title: 'ID',
      description: 'unique string used to identify the Industry',
      type: 'string',
      readOnly: true,
      validation: Rule => [
        Rule.required().error('ID is required.'),
        Rule.custom(async (current, context) => {
          try {
            if (context) {
              const id = context.document._id.toString().replace('drafts.','');
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
      title: 'Industry Name',
      type: 'string',
      validation: Rule => Rule.required().error('Industry Name is required.'),
    },
    {
      name: 'industryImage',
      title: 'Industry Image',
      description: 'Image used on Client detail pages within the fixed sidebar. Recommended Image Dimensions: 154 x 154',
      type: 'csodImage',
    },
  ],
  preview: {
    select: {
      media: 'industryImage',
      title: 'displayName',
    },
  },
};
