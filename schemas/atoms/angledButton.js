import { localizePreview } from '../utils';
import { buttonColors } from './button';

export default {
  name: 'angledButton',
  title: 'Angled Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
    {
      name: 'angle',
      title: 'Angle',
      type: 'string',
      description: 'Which corner should have the acute angle? Default is bottom right.',
      options: {
        layout: 'radio',
        list: [
          {
            title: 'Bottom right (bottom of button is slanted)', value: 'bottom',
          },
          {
            title: 'Top left (top of button is slanted)', value: 'top',
          },
        ],
      },
    },
    buttonColors,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'color',
    },
    prepare: localizePreview(selection => selection),
  },
};
