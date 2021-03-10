import { buttonColors } from './button';

export default {
  name: 'videoButtonV1',
  title: 'Video Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'videoV1',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    buttonColors,
  ],
};
