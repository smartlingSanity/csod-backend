/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client';
import _ from 'lodash/fp';
import SlugText from '../../src/components/SlugText';

export default {
  name: 'routePrefix',
  title: 'Page URL Prefix',
  type: 'document',
  description: 'Prefix to specify for a page document to generate its URL',
  fields: [
    {
      name: 'pageType',
      title: 'Page Type',
      description: 'Page type to associate with the URL prefix',
      type: 'string',
      options: {
        list: [{ title: 'Press Release Page', value: 'pressReleasePage' }],
      },
      validation: Rule => [
        Rule.required(),
        Rule.custom(async (pageType, context) => {
          const _id = _.getOr('', 'document._id', context);
          const routePrefix = await client.fetch(`//groq
            *[_type == "routePrefix"
              && pageType == "${pageType}"
              && !(_id match "${_id}")
              && _id != "${_id}"]
          `);
          if (!_.isEmpty(routePrefix)) {
            return {
              message:
                'This page type already has a prefix associated with it. Please edit the existing prefix or select a different page type.',
              paths: ['pageType'],
            };
          }
          return true;
        }),
      ],
    },
    {
      name: 'prefix',
      title: 'Prefix',
      description:
        'This prefix value will be added to the page URL. A "/" is required at the beginning and end of the prefix. Ex. "/company/news/" will autogenerate the URL as cornerstoneondemand.com/company/news/[page-title].',
      type: 'slug',
      inputComponent: SlugText,
      validation: Rule => [Rule.required()],
    },
  ],
  preview: {
    select: {
      title: 'prefix.current',
      subtitle: 'pageType',
    },
  },
};
