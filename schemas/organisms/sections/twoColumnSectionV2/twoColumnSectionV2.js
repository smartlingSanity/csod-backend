import React from 'react';
import twoColumnSectionIcon from './assets/robot-icon.svg';

export default {
  name: 'twoColumnSectionV2',
  title: 'Two Column Section V2',
  type: 'object',
  fields: [
    {
      name: 'textBlockV2',
      title: 'Text Content',
      type: 'textBlockV2',
    },
    {
      name: 'imageOrMedia',
      title: 'Image/Media',
      type: 'array',
      of: [
        { type: 'csodImage' },
        { type: 'inlineVideo' },
        { type: 'productScreenAnimation' },
      ],
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
        subtitle: type,
        media: <img alt="two column icon" src={twoColumnSectionIcon} />,
      };
    },
  },
};
