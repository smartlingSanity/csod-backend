import SectionPreview from '../../../../src/components/SectionPreview/SectionPreview';

import { paddingTop, paddingBottom } from '../../../sharedFields';
import { localizePreview } from '../../../utils';

export default {
  name: 'slantBanner',
  title: 'Slant Banner',
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
      background: 'backgroundImage',
    },
    prepare: localizePreview(({ title, subtitle, background }) => ({
      title,
      subtitle,
      media: background,
    })),
    component: SectionPreview,
  },
};
