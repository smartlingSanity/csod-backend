import { paddingTop, paddingBottom } from '../../../sharedFields';
import SectionPreview from '../../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../../utils';

export default {
  name: 'subscriptionSlantBanner',
  title: 'Subscription Slant Banner',
  type: 'object',
  fields: [
    {
      name: 'backgroundImage',
      title: 'Full Background Image',
      description: 'A background image that spans the full width of the page',
      type: 'localeCsodImage',
    },
    paddingTop,
    paddingBottom,
    {
      name: 'textBlock',
      title: 'Text Block',
      type: 'textBlock',
    },
    {
      name: 'videoButton',
      title: 'Video Button',
      type: 'videoButton',
    },
    {
      name: 'fixedSideBar',
      title: 'Side Bar',
      type: 'subscriptionFixedSideBar',
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: '_type',
      media: 'backgroundImage',
    },
    prepare: localizePreview(({ title, subtitle, media }) => ({
      title, subtitle, media,
    })),
    component: SectionPreview,
  },
};
