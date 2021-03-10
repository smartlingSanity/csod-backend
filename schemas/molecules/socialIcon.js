import { localizePreview } from '../utils';

export default {
  name: 'socialIcon',
  title: 'Social Icon',
  type: 'object',
  fields: [
    {
      name: 'socialIcon',
      title: 'Social Icon Image',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Blog', value: 'blog' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required().error('A social icon is required.'),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: Rule => Rule.required().error('A link is required.'),
    },
  ],
  preview: {
    select: {
      title: 'link.text',
    },
    prepare: localizePreview(selection => selection),
  },
};
