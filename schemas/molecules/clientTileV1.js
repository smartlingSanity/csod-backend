/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'part:@sanity/base/router';
import client from 'part:@sanity/base/client';
import { localizePreview } from '../utils';

export default {
  name: 'clientTileV1',
  title: 'Client Tile Version 1',
  type: 'object',
  description: 'A small client card that display a client image and logo',
  fields: [
    {
      name: 'clientEntity',
      title: 'Client',
      description:
  <p>
    <Link href="/intent/create/type=clientEntity;template=clientEntity/">
      Add new client
    </Link>
    {' '}
    or select an existing one
  </p>,
      type: 'reference',
      to: [{ type: 'clientEntity' }],
      validation: Rule => [
        Rule.required().error('Client is required.'),
        Rule.custom(async (current, { parent }) => {
          try {
            if (!current) {
              return true;
            }
            if (parent.clientEntity && parent.clientEntity._ref === current._ref) {
              const id = current._ref;
              const selectedEntity = await client.fetch(`//groq
              *[_type == "clientEntity" 
              && _id == "${id}"][0] 
              `);
              if (selectedEntity) {
                if (!selectedEntity.clientLogoColor) {
                  return 'This client has no client Logo image. Please add an image before using this client.';
                }
              }
            }
            return true;
          } catch (error) {
            return error.message;
          }
        }),
      ],
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: Rule => Rule.required().error('Heading is required.'),
    },
    {
      name: 'bgImage',
      title: 'Background image',
      description: 'Recommended Image Dimensions 430 x 285',
      type: 'localeCsodImage',
    },
    {
      name: 'animatedButton',
      title: 'Animated Button',
      type: 'animatedButton',
    },
    {
      name: 'videoButton',
      title: 'Video Button',
      type: 'videoButton',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'clientEntity.clientLogoColor',
    },
    prepare: localizePreview(selection => selection),
  },
};
