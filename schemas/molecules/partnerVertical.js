import { partnerFilterSegment } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'partnerVertical',
  title: 'Partner Vertical',
  type: 'document',
  fields: [...partnerFilterSegment],
  preview: {
    select: {
      title: 'name',
    },
    prepare: localizePreview(selection => selection),
  },
};
