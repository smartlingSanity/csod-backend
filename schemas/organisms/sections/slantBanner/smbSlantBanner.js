import { paddingTop, paddingBottom } from '../../../sharedFields';
import SectionPreview from '../../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../../utils';

export default {
  name: 'smbSlantBanner',
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
      description: 'A background image that spans the full width of the page. Recommended image size 1680x500',
      type: 'localeCsodImage',
    },
    paddingTop,
    paddingBottom,
    {
      name: 'preTitle',
      title: 'PreTitle',
      type: 'localeString',
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
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: '_type',
      media: 'backgroundImage',
    },
    prepare: localizePreview(({ title, subtitle, media }) => ({
      title,
      subtitle,
      media,
    })),
    component: SectionPreview,
  },
};
