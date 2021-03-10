import languageFilterConfig from '../../config/languageFilterConfig';
import LocaleInput from '../../src/components/LocaleInput';

const { supportedLanguages } = languageFilterConfig;

export default (name, referenceType) => ({
  name,
  type: 'object',
  inputComponent: LocaleInput,
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'reference',
    to: [{ type: referenceType }],
  })),
});
