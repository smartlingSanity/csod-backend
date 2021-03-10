import React from 'react';
import ReturnToPage from '../../src/components/ReturnToPage';
import { paddingTop, paddingBottom } from '../sharedFields';

// localization NA
export default {
  name: 'sectionStyles',
  title: 'Section Styles',
  type: 'object',
  description: 'Apply a custom top/bottom padding or background for a section',
  fields: [
    {
      title: 'Background Type',
      description: 'Select the background component for this section. '
        + 'If two (or more) adjacent sections are set to the same "background type", they will both be displayed '
        + 'in a single instance of that background.',
      name: 'backgroundSection',
      type: 'array',
      of: [
        // comment out until we've tested them more thoroughly
        // { type: 'grayBox' },
        // { type: 'grayBoxBottomSlant' },
        // { type: 'grayBoxDoubleSlant' },
        // { type: 'grayBoxTopSlant' },
        // { type: 'grayCurves' },
        {
          type: 'reference',
          to: [{ type: 'customBackground' }],
          title: 'Custom Background',
          description: <ReturnToPage docType="customBackground">or create new one</ReturnToPage>,
        }],
      validation: Rule => Rule.max(1),
    },
    paddingTop,
    paddingBottom,
    {
      name: 'backgroundColor',
      title: 'Background Color',
      description: 'A background color for the entire section',
      type: 'string',
      options: {
        list: [
          { title: 'Light Gray', value: 'lightGray' },
          { title: 'Dark Gray', value: 'darkGray' },
          { title: 'Primary', value: 'primary' },
          { title: 'White', value: 'white' },
          { title: 'Transparent', value: 'transparent' },
        ],
      },
    },
    {
      name: 'marginTop',
      title: 'Margin Top (in pixels, can be negative. Ex. -60)',
      description: 'This can be used to pull a section up so it overlaps with another section',
      type: 'number',
    },
    {
      name: 'marginTopPercentage',
      title: 'Margin Top Percentage?',
      description: 'Use only if you wish to use percent instead of px',
      type: 'boolean',
    },
    {
      name: 'marginBottom',
      title: 'Margin Bottom (in pixels, can be negative. Ex. -60)',
      description: 'This can be used to pull a subsequent section up so it overlaps with this section',
      type: 'number',
    },
    {
      name: 'backgroundPositionY',
      title: 'Background Vertical Position (in pixels)',
      description: 'This can be used to push a background image down the page, useful for MultiSection component',
      type: 'number',
    },
  ],
};
