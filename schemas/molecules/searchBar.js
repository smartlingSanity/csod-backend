/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client';
import _ from 'lodash/fp';

export default {
  name: 'searchBar',
  title: 'Search Bar',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Search bar identifier',
      validation: Rule => Rule.custom(async (name, context) => {
        const _id = _.getOr('', 'document._id', context);
        try {
          if (name) {
            const duplicateSearchBar = await client.fetch(`//groq
              *[_type=="searchBar" && name == "${name}" && !(_id match "${_id}")]`);
            if (!_.isEmpty(duplicateSearchBar)) {
              return '`Name` field must be unique';
            }
            return true;
          }
          return 'Required';
        } catch (error) {
          return error.message;
        }
      }),
    },
    {
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      description: 'Input placeholder',
      validation: Rule => Rule.required(),
    },
    {
      name: 'button',
      title: 'Button',
      type: 'buttonV1',
      validation: Rule => Rule.required(),
    },
  ],
};
