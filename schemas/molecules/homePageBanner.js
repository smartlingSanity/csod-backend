import validation from '../utils/validation';

export default {
  name: 'homePageBanner',
  title: 'Home Page Banner',
  type: 'object',
  fields: [
    {
      name: 'backgroundImage',
      title: 'Full Background Image',
      description: 'A background image that spans the full width of the page',
      type: 'localeCsodImage',
    },
    {
      name: 'align',
      title: 'Text Alignment',
      description: 'Choose if text will be aligned left or center',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'angledButton' }, { type: 'animatedButton' }, { type: 'button' }, { type: 'videoButton' }],
      description: 'One button is required. Maximum of two buttons allowed.',
      validation: Rule => Rule.required().min(1).max(2),
    },
  ],
  preview: {
    // have to select something in order for the prepare function
    // to return the text we want to display
    select: {
      title: 'Home Page Banner',
    },
  },
};
