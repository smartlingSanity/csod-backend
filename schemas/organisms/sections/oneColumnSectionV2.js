import React from 'react';
import oneColumnSectionV2Icon from './assets/robot-icon.svg';

export default {
  name: 'oneColumnSectionV2',
  title: 'One Column Section V2',
  type: 'object',
  fields: [
    {
      name: 'textBlockV2',
      title: 'Text Content',
      type: 'textBlockV2',
    },
    {
      name: 'imageOrProductScreen',
      title: 'Image or Product Screen Animation',
      description: 'This will replace the above field after we launch. This field overrides the above field.',
      type: 'array',
      of: [{ type: 'csodImage' }, { type: 'productScreenAnimation' }],
      validation: Rule => Rule.max(1).error('A maximum of 1 is allowed'),
    },
  ],
  preview: {
    select: {
      title: 'textBlockV2.headingText',
      type: '_type',
    },
    prepare({ title, type }) {
      return {
        title,
        subtitle: `${type} (Algorithmic Design)`,
        media: <img alt="one column icon" src={oneColumnSectionV2Icon} />,
      };
    },
  },
};
