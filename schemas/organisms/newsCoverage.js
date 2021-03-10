import { enabledLocaleField } from '../sharedFields';

export default {
  name: 'newsCoverage',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    enabledLocaleField(false),
    {
      name: 'postDate',
      title: 'Post Date',
      type: 'datetime',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'csodImage',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
};
