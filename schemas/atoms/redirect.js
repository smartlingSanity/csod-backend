/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client';
import _ from 'lodash/fp';

export default {
  name: 'redirect',
  type: 'document',
  title: 'Redirect',
  initialValue: {
    status: '301',
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used to identify redirects on sanity studio',
    },
    {
      name: 'from',
      title: 'From',
      description:
        'The URL you want to redirect, example: https://www.cornerstoneondemand.com/learning/',
      type: 'externalLinkV1',
      validation: Rule => [
        Rule.custom(async (from, context) => {
          const _id = _.getOr('', 'document._id', context);
          try {
            const externalLink = _.getOr('', 'externalLink', from);
            if (externalLink) {
              const regexURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()*?&//=]*)/gm;
              if (!regexURL.test(externalLink)) {
                return {
                  message:
                    'Invalid redirect URL format. https:// and trailing slash / is required',
                  paths: ['externalLink'],
                };
              }
              const duplicateFromRedirect = await client.fetch(`//groq
              *[_type=="redirect" && from.externalLink == "${externalLink}" && !(_id match "${_id}")]`);
              if (!_.isEmpty(duplicateFromRedirect)) {
                return {
                  message: '`From` field must be unique',
                  paths: ['externalLink'],
                };
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
      name: 'to',
      title: 'To',
      description: 'The URL or path you want to redirect to',
      type: 'array',
      of: [
        {
          title: 'External Link',
          type: 'externalLinkV1',
        },
        { title: 'Internal Link', type: 'reference', to: [{ type: 'route' }] },
      ],
      validation: Rule => [
        Rule.required(),
        Rule.max(1).error('You can only choose one link'),
      ],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Http status code you want to use in the redirect',
      options: {
        list: [
          { title: '301 - Redirect', value: '301' },
          { title: '302 - Temporary Redirect', value: '302' },
          { title: '404 - Not Found', value: '404' },
        ],
        layout: 'select',
      },
    },
  ],
};
