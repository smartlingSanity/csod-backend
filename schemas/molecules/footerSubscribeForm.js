import form from './form';

const createCustomRequiredValidation = (errorMessage = 'Required') => Rule => Rule.custom((value, context) => {
  if (context.parent.enabled) {
    // Required validation depending on 'enabled' field
    return value ? true : errorMessage;
  }
  return true;
});

// import the form object but replace the allowed
// fields with just 'gdprEmailFormFieldReference'
// and get rid of the 'formType' and 'sectionStyles' fields
const newFormFields = form.fields.map((field) => {
  const newField = Object.assign({}, field);

  if (newField.name === 'formFields') {
    newField.of = [{ type: 'gdprEmailFormFieldReference' }];
  } else if (newField.name === 'sfid') {
    newField.description = 'If no value is specified, the SFID will default to 701j0000001QfoS';
  } else if (newField.name === 'name') {
    newField.validation = createCustomRequiredValidation('A name is required');
  } else if (newField.name === 'action') {
    newField.validation = createCustomRequiredValidation();
  } else if (newField.name === 'submitButton') {
    newField.validation = createCustomRequiredValidation('A button is required');
  }

  return newField;
}).filter(field => !['formType', 'sectionStyles'].includes(field.name));

export default {
  ...form,
  name: 'footerSubscribeForm',
  fields: [
    {
      name: 'enabled',
      title: 'Enable',
      type: 'boolean',
    },
    ...newFormFields,
  ],
};
