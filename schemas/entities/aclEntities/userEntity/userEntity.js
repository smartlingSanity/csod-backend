import client from 'part:@sanity/base/client';
import languageFilterConfig from '../../../../config/languageFilterConfig';

export default {
  name: 'userEntity',
  title: 'User',
  type: 'document',
  readOnly: true,
  fields: [
    {
      name: 'userSanityID',
      type: 'string',
      hidden: true,
    },
    {
      name: 'userEntityFirstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'userEntityLastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'userEntityEmail',
      title: 'Email Address',
      type: 'string',
      validation: Rule => [
        Rule.required().error('Email is required.'),
        Rule.custom(async (userEntityEmail, { document }) => {
          try {
            if (document) {
              if (typeof userEntityEmail !== 'undefined') {
                const id = document._id.toString().replace('drafts.', '');
                const otherEmailsQuery = '*[_type == "userEntity" && userEntityEmail == "$userEmail" && !(_id match "drafts.$docID" || _id match "$docID" )]';
                const otherEmailsParams = {
                  userEmail: userEntityEmail,
                  docID: id,
                };
                const otherEmails = await client.fetch(
                  otherEmailsQuery,
                  otherEmailsParams,
                );

                if (otherEmails.length > 0) {
                  return `Email address already in use by ${otherEmails[0].userEntityFirstName} ${otherEmails[0].userEntityLastName}`;
                }
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
      name: 'userEntityLocales',
      title: 'Locales',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: languageFilterConfig.supportedLanguages.map(({ title, id }) => ({
          title,
          value: id,
        })),
      },
    },
  ],
  preview: {
    select: {
      title: 'userEntityName',
      subtitle: 'userEntityEmail',
      userEntityFirstName: 'userEntityFirstName',
      userEntityLastName: 'userEntityLastName',
    },
    prepare(userEntity) {
      const title = `${userEntity.userEntityFirstName || ''} ${
        userEntity.userEntityLastName || ''
      }`.trim();
      const { subtitle } = userEntity;
      return { title, subtitle };
    },
  },
};
