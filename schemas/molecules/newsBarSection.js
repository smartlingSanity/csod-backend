/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import newsBarInput from '../../src/components/newsBarInput';

export const backgroundColor = {
  name: 'backgroundColor',
  title: 'Background Color',
  type: 'string',
  fieldset: 'chooseNewsBarType',
  validation: Rule => Rule.required(),
  options: {
    list: [
      { title: 'White', value: 'white' },
      { title: 'Primary', value: 'primary' },
      { title: 'Dark Gray', value: 'darkGray' },
    ],
    layout: 'list',
  },
};

export const newsBarType = {
  name: 'newsBarType',
  title: 'News Bar Type',
  type: 'string',
  fieldset: 'chooseNewsBarType',
  validation: Rule => Rule.required(),
  options: {
    list: [
      { title: 'Small', value: 'small' },
      { title: 'Large', value: 'large' },
    ],
    layout: 'list',
  },
};

export default {
  name: 'newsBarSection',
  title: 'News Bar Entries',
  description: 'Add a news bar entry here. News Bar displays at the top of the homepage',
  type: 'document',
  inputComponent: newsBarInput,
  fieldsets: [
    { name: 'chooseNewsBarType', title: ' Choose News Bar Type' },
  ],
  fields: [
    newsBarType,
    backgroundColor,
    {
      name: 'notificationBarImage',
      title: 'Image in notification bar',
      description: 'Image to the right of text in notification bar (266x150 images work best)',
      type: 'csodImage',
      fieldset: 'chooseNewsBarType',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      fieldset: 'chooseNewsBarType',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      fieldset: 'chooseNewsBarType',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      description: 'Maximum one link is allowed',
      fieldset: 'chooseNewsBarType',
      validation: Rule => Rule.custom((fields, context) => {
        if (context.document.newsBarType === 'large') return true;
        if (context.document.link.link === undefined || !fields || context.document.link.link.length < 1) return 'One link is required';
        if (context.document.link.link.length > 1) return 'Maximum of one link allowed';
        return true;
      }),
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'animatedButton' }, { type: 'button' }, { type: 'videoButton' }],
      description: 'One button is required. Maximum of two buttons allowed.',
      fieldset: 'chooseNewsBarType',
      validation: Rule => Rule.custom((fields, context) => {
        if (context.document.newsBarType === 'small') return true;
        if (context.document.buttons === undefined
          || context.document.buttons.length < 1
        ) return 'One Button is required';
        if (context.document.buttons.length > 2) return 'Maximum of two buttons allowed';
        return true;
      }),
    },
    {
      name: 'closeText',
      title: 'Close Text',
      type: 'string',
      description: 'Text user clicks to close large newbar. Defaults to "CLOSE"',
      fieldset: 'chooseNewsBarType',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      id: '_id',
    },
    prepare(selection) {
      const { title, id } = selection;
      return {
        title,
        subtitle: `ID: ${id}`,
      };
    },
  },
};
