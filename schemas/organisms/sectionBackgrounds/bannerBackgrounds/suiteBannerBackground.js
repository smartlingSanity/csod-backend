import backgroundSettingsGenerator from '../utils/sectionBackgroundGenerator/sectionBackgroundGenerator';

export default backgroundSettingsGenerator(
  {
    name: 'suiteBannerBackground',
    title: 'Suite Banner Background',
    contentSections: [
      { type: 'suiteBannerSection', title: 'Suite Banner Section' },
      { type: 'threeCardSection', title: 'Three Card Section' }],
  },
);
