import { partnerFilterSegment } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'region',
  title: 'Region',
  type: 'document',
  fields: [...partnerFilterSegment],
  preview: {
    select: {
      title: 'name',
    },
    prepare: localizePreview(selection => selection),
  },
};
