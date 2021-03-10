import localeReference from '../atoms/localeReference';

export default {
  ...localeReference('localeNewsCoverageReference', 'newsCoverage'),
  preview: {
    select: {
      title: '...',
    },
    prepare: selection => selection,
  },
};
