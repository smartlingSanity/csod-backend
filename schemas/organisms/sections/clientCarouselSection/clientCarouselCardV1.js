/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'part:@sanity/base/router';
import client from 'part:@sanity/base/client';

const quotesContextCache = {};

export default {
  name: 'clientCarouselCardV1',
  title: 'Carousel Card',
  type: 'object',
  fields: [
    {
      name: 'clientEntity',
      title: 'Client',
      description:
  <p>
    Carousel Card will use selected client&apos;s logo for the Carousel Nav
    <br />
    <Link href="/intent/create/type=clientEntity;template=clientEntity/">
      Create new client
    </Link>
    {' '}
    or select an existing one.
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
            if ('clientEntity' in parent && parent.clientEntity._ref === current._ref) {
              const id = current._ref;
              const selectedEntity = await client.fetch(`//groq
              *[_type == "clientEntity" 
              && _id == "${id}"][0] 
              `);
              if (selectedEntity) {
                if (!('quotes' in selectedEntity) || selectedEntity.quotes.length < 1) {
                  // eslint-disable-next-line no-param-reassign
                  delete parent.quoteEntity;
                  return 'This client has no associated quotes. Please add quotes before using this client.';
                }
                quotesContextCache[id] = { quotes: [] };
                quotesContextCache[id].quotes = selectedEntity.quotes;
                const quotes = quotesContextCache[id].quotes.map(quote => quote._ref);

                if ('quoteEntity' in parent && !quotes.includes(parent.quoteEntity._ref)) {
                  // eslint-disable-next-line no-param-reassign
                  delete parent.quoteEntity;
                }

                if (!('clientLogoCarouselNav' in selectedEntity)) {
                  return 'This client has no nav bar image. Please add image before using this client.';
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
      name: 'quoteEntity',
      title: 'Quote',
      description:
  <p>
    Carousel Card will get the author, image and text from selected quote.
    <br />
    <Link href="/intent/create/type=quoteEntity;template=quoteEntity/">
      Create new quote
    </Link>
    {' '}
    or select an existing one.
  </p>,
      type: 'reference',
      to: [{ type: 'quoteEntity' }],
      options: {
        filter: ({ parent }) => {
          const id = ('clientEntity' in parent) ? parent.clientEntity._ref : '';
          const entity = (id && id in quotesContextCache) ? quotesContextCache[id] : { quotes: [] };
          const quotes = ('quotes' in entity) ? entity.quotes.map(quote => quote._ref) : [];
          return {
            filter: '_id in $quotes',
            params: {
              quotes,
            },
          };
        },
      },
      validation: Rule => Rule.required().error('Quote is required.'),
    },
    {
      name: 'heading',
      title: 'Carousel Heading',
      type: 'text',
    },
    {
      name: 'bgImage',
      title: 'Carousel Background Image',
      type: 'csodImage',
    },
    {
      name: 'videoButton',
      title: 'Video Button',
      type: 'videoButton',
    },
    {
      name: 'animatedButton',
      title: 'Animated Button',
      type: 'animatedButton',
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
      media: 'clientLogoColor',
      title: 'heading',
      subtitle: 'clientQuoteText',
    },
  },
};
