/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'part:@sanity/base/router';

export const clientEntityReferenceFieldArray = title => ({
  name: 'clientEntityReferenceFieldArray',
  title: title || 'Client',
  type: 'array',
  of: [
    {
      type: 'reference',
      title: 'client',
      description:
        <p>
          <Link href="/intent/create/type=clientEntity;template=clientEntity/">
            Add new quote
          </Link>
          {' '}
          or select an existing one
        </p>,
      to: [{ type: 'clientEntity' }],
    },
  ],
  validation: Rule => Rule.required(),
});

export default {
  clientEntityReferenceFieldArray,
};
