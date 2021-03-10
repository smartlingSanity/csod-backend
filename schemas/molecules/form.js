import { localizePreview } from '../utils/index';

export default {
  name: 'form',
  title: 'CSOD Form (previously just "Form")',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'name',
      title: 'Name',
      description: 'Not visible to users - can be the same as the title',
      type: 'string',
      validation: Rule => Rule.required().error('A name is required'),
    },
    {
      name: 'sfid',
      title: 'Campaign ID / SFID',
      description:
        'Salesforce ID (will be overridden if there is an SFID assigned to a selected dropdown option)',
      type: 'string',
    },
    {
      name: 'formType',
      title: 'Form Type',
      description:
        'Type of form (This will populate the data_source_c hidden field for Marketo)',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Us', value: 'contactUs' },
          { title: 'Demo', value: 'demo' },
          { title: 'Footer', value: 'footer' },
          { title: "Let's Talk", value: 'letsTalk' },
          { title: 'Marketplace', value: 'marketplace' },
        ],
        layout: 'list',
      },
    },
    {
      name: 'action',
      title: 'Action',
      description: 'Where to go after form submission',
      type: 'reference',
      to: [{ type: 'route' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'formFields',
      title: 'Fields',
      type: 'array',
      of: [
        { type: 'reusableFormField' },
        // will add custom fields as options later
      ],
      validation: Rule => Rule.min(1).error('You must add at least one field'),
    },
    {
      name: 'submitButton',
      title: 'Submit Button',
      type: 'button',
      validation: Rule => Rule.required().error('A button is required'),
    },
    {
      name: 'requiredInstruction',
      title: 'Instructions for Required Fields',
      description:
        'Instructions explaining the asterisk. Defaults to "Indicates required field"',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
    },
    prepare: localizePreview(selection => selection),
  },
};
