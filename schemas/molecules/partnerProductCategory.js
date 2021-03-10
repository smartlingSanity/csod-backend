import { partnerFilterSegment } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'partnerProductCategory',
  title: 'Marketplace Product Category',
  type: 'document',
  fields: [...partnerFilterSegment],
  preview: {
    select: {
      title: 'name',
    },
    prepare: localizePreview(selection => selection),
  },
};
