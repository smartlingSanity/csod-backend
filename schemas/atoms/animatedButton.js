import { buttonColors } from './button';

export default {
  name: 'animatedButton',
  title: 'Animated Button',
  type: 'object',
  options: { collapsible: true },
  fields: [
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
    buttonColors,
  ],
  preview: {
    select: {
      title: 'link.text',
      subtitle: 'color',
    },
  },
};
