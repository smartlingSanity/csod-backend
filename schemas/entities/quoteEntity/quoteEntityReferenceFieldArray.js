/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { Link } from 'part:@sanity/base/router';

export const quoteEntityReferenceFieldArray = title => ({
  name: 'quoteEntityReferenceFieldArray',
  title: title || 'Quote',
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
  validation: Rule => Rule.required(),
});

export default {
  quoteEntityReferenceFieldArray,
};
