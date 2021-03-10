import { paddingTop, paddingBottom } from '../../../sharedFields';
import { localizePreview } from '../../../utils';

export default {
  name: 'allSmbClientsSlantBanner',
  title: 'SMB Slant Banner',
  type: 'object',
  fieldsets: [
    {
      name: 'tagBarFields',
      title: 'Tag Bar',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'backgroundImage',
      title: 'Full Background Image',
      description: 'A background image that spans the full width of the page in the banner',
      type: 'localeCsodImage',
    },
    paddingTop,
    paddingBottom,
    {
      name: 'preTitle',
      title: 'PreTitle',
      type: 'string',
    },
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
      name: 'tagBar',
      title: 'Tag Bar',
      type: 'tagBar',
      fieldset: 'tagBarFields',
    },
    {
      name: 'clientCarouselCard',
      title: 'Client Card',
      type: 'clientCarouselCard',
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: 'textBlock.description',
    },
    prepare: localizePreview(selection => selection),
  },
};
