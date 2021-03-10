import languageFilterConfig from '../../config/languageFilterConfig';
import LocaleInput from '../../src/components/LocaleInput';

const { supportedLanguages } = languageFilterConfig;

export default {
  name: 'localeBlockContent',
  type: 'object',
  inputComponent: LocaleInput,
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'blockContent',
  })),
};
