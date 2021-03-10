import { companyName } from '../sharedFields';
import validation from '../utils/validation';

export default {
  name: 'awardsRecognition',
  title: 'Awards & Recognitions From Newsroom',
  type: 'object',
  fields: [
    companyName,
    {
      name: 'newsCoverage',
      title: 'News Coverage',
      type: 'localeNewsCoverageReference',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
  ],
  preview: {
    select: {
      title: 'companyName.us',
      subtitle: 'newsCoverage.us.title',
      media: 'newsCoverage.us.logo',
    },
  },
};
