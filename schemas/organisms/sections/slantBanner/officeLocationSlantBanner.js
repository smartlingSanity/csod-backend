import { paddingTop, paddingBottom } from '../../../sharedFields';
import { localizePreview } from '../../../utils';

export default {
  name: 'officeLocationSlantBanner',
  title: 'Office Location Slant Banner',
  type: 'object',
  fields: [
    paddingTop,
    paddingBottom,
    {
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
    },
    {
      name: 'headquartersCard',
      title: 'Headquarters Card',
      type: 'headquartersCard',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: localizePreview(selection => selection),
  },
};
