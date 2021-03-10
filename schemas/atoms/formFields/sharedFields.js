import validation from '../../utils/validation';

export const emailOptIn = {
  name: 'emailOptInText',
  title: 'Email Opt In Text',
  description:
    'Will only display for countries for which it\'s required. Enter a value to override the default (default is: "Opt in to email communications from Cornerstone").',
  type: 'localeString',
};

export const gdprCheckboxText = {
  name: 'gdprText',
  title: 'GDPR Consent Checkbox Text',
  description:
    'Will only display for countries in the EU. Enter a value to override the default (default is: "I consent with the general conditions of use described by Cornerstone OnDemand Privacy Policy").',
  type: 'localeBlockContent',
};

export const marketoFieldName = {
  name: 'marketoFieldName',
  title: 'Marketo Field Name',
  type: 'string',
  description:
    'The Text Label is used if this field is left blank. Enter a different value if needed for Marketo.',
};

export const optional = {
  name: 'optional',
  title: 'Optional',
  description:
    'Fields are required by default. Set to true if this question is optional.',
  type: 'boolean',
};

export const placeholder = {
  name: 'placeholder',
  title: 'Placeholder',
  description: 'This will be inside the field before the user enters text.',
  type: 'localeString',
  validation: Rule => Rule.custom(validation.requiredByLocale).error('Placeholder is required'),
};

export const textBlock = {
  name: 'textBlock',
  title: 'Text Block',
  description:
    'This will be visible next to the field and used to create the field name.',
  type: 'textBlock',
  validation: Rule => Rule.custom(validation.requiredByLocale).error('Text Block is required'),
};

export const textLabel = {
  name: 'textLabel',
  title: 'Text Label',
  description:
    'This will be visible next to the field and used to create the field name.',
  type: 'localeString',
  validation: Rule => Rule.custom(validation.requiredByLocale).error('Text Label is required'),
};

export default {
  emailOptIn,
  gdprCheckboxText,
  marketoFieldName,
  optional,
  placeholder,
  textBlock,
  textLabel,
};
