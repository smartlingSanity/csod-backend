export default {
  supportedLanguages: [
    // If your localized fields are set up using the
    {
      id: 'us',
      title: 'United States',
      language: 'en',
      isDefault: true,
      countries: ['US'],
    },
    {
      id: 'apEn',
      title: 'Asia',
      language: 'en',
      countries: [
        'SG',
        'HK',
        'KR',
        'ID',
        'TH',
        'TW',
        'MO',
        'MY',
        'PH',
        'VN',
      ],
    },
  ],
  filterField: (enclosingType, field, selectedLanguageIds) => (
    !enclosingType.name.startsWith('locale')
    || selectedLanguageIds.includes(field.name)
  ),
};
