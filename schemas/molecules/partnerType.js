import { partnerFilterSegment } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'partnerType',
  title: 'Partner Type',
  type: 'document',
  fields: [...partnerFilterSegment],
  preview: {
    select: {
      title: 'name',
    },
    prepare: localizePreview(selection => selection),
  },
};
