/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { Link } from 'part:@sanity/base/router';
import client from 'part:@sanity/base/client';

const quotesContextCache = [];

export default {
  name: 'quoteLogoSliderV1',
  title: 'Quote Logo Slider V1',
  type: 'object',
  fields: [
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'csodImage',
    },
    {
      name: 'hide',
      title: 'Hide Quote Logos. defaults to false',
      description: 'For when you want a quote slider of non-client quotes, or when you don’t have logos/images for every quote',
      type: 'boolean',
    },
    {
      name: 'quoteEntityReferenceFieldArray',
      title: 'Select Client Quotes for Quote Logo Slider',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Quote',
          description:
            <p>
              <Link href="/intent/create/type=quoteEntity;template=quoteEntity/">
                Add new quote
              </Link>
              {' '}
              or select an existing one
            </p>,
          to: [{ type: 'quoteEntity' }],
        },
      ],
      validation: Rule => [
        Rule.required().error('Client Quotes are required'),
      ],
    },
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
  ],
  preview: {
    select: {
      title: '_type',
    },
  },
};
