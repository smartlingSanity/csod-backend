import { buttonColors } from './button';

export default {
  name: 'videoButton',
  title: 'Video Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'video',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'localeString',
    },
    buttonColors,
  ],
};
