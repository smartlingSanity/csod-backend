/* eslint-disable import/no-extraneous-dependencies */
const Schema = require('@sanity/schema').default;
const { JSDOM } = require('jsdom');

/* This library is used to convert the html string into block content format */
const blockTools = require('@sanity/block-tools').default;

/* The block content schema definition is needed so the deserializer
will respect the schema  when deserializing to blocks.
I.e. if the schema doesn't allow h2-styles,
all h2 html-elements will deserialized to normal styled blocks. */

const defaultSchema = Schema.compile({
  name: 'defaultSchema',
  types: [
    {
      type: 'object',
      name: 'blockContent',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
              ],
              lists: [{ title: 'Bullet', value: 'bullet' }],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get('blockContent')
  .fields.find(field => field.name === 'body').type;

module.exports = {
  htmlToPortableText(html) {
    return blockTools.htmlToBlocks(
      `<html><body><div>${html}</div></body></html>`,
      blockContentType,
      {
        parseHtml: _html => new JSDOM(_html).window.document,
      },
    );
  },
};
