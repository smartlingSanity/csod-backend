const client = require('part:@sanity/base/client');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const {
      formPages,
      formFieldReferences,
      formBlurbReferences,
    } = await client.fetch(`//groq
    { 
      "formPages": *[_type=="formPage"],
      "formFieldReferences": *[_type in [
        "checkBoxFormFieldReference",
        "countryFormFieldReference",
        "dropdownFormFieldReference",
        "emailInputFormFieldReference",
        "textAreaFormFieldReference",
        "textInputFormFieldReference"
       ]],
      "formBlurbReferences": *[_type=="formBlurbReference"],
    }
    `);

    const tx = client.transaction();
    formPages.forEach((formPage) => {
      const localizedFormPage = localize(formPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizedFormPage, enabledLocale: 'all' });
    });

    formFieldReferences.forEach((formFieldReference) => {
      const localizedFormFieldReference = localize(formFieldReference, {
        ...baseStringTypeMap,
        emailOptInText: 'localeString',
        gdprText: 'localeString',
        placeholder: 'localeString',
        requiredInstruction: 'localeString',
        textLabel: 'localeString',
        value: 'localeString',
      });
      tx.createOrReplace(localizedFormFieldReference);
    });

    formBlurbReferences.forEach((formBlurbReference) => {
      const localizedFormBlurbReference = localize(formBlurbReference, {
        blurbHeading: 'localeString',
      });
      tx.createOrReplace(localizedFormBlurbReference);
    });

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
