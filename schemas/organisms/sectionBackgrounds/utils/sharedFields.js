/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReturnToPage from '../../../../src/components/ReturnToPage';

export const backgroundSectionField = {
  title: 'Background Type',
  description: 'Select the background component for this section. '
      + 'If two (or more) adjacent sections are set to the same "background type", they will both be displayed '
      + 'in a single instance of that background.',
  name: 'backgroundSection',
  type: 'array',
  of: [
    { type: 'grayBox' },
    { type: 'grayBoxBottomSlant' },
    { type: 'grayBoxDoubleSlant' },
    { type: 'grayBoxTopSlant' },
    { type: 'grayCurves' },
    {
      type: 'reference',
      to: [{ type: 'customBackground' }],
      title: 'Custom Background',
      description: <ReturnToPage docType="customBackground">or create new one</ReturnToPage>,
    }],
  validation: Rule => Rule.max(1),
};

export default {
  backgroundSectionField,
};
