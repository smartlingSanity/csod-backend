import { getDocumentEnabledLocale } from '../../schemas/utils';
import languageFilterConfig from '../../config/languageFilterConfig';

export default function LocaleBadge({ published, draft }) {
  const document = draft || published;
  if (document) {
    const enabledLocale = getDocumentEnabledLocale(document);

    const isGlobal = enabledLocale === 'all';
    const locale = languageFilterConfig.supportedLanguages.find(
      language => language.id === enabledLocale,
    );
    const label = isGlobal ? 'Global' : `Local - ${enabledLocale}`;
    const title = isGlobal
      ? 'This document works for all locales'
      : `This document only works for ${locale.title}`;

    return {
      label,
      title,
      color: 'info',
    };
  }
  return null;
}
