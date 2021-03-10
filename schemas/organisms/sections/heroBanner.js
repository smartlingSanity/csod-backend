import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils';

export default {
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'object',
  fields: [
    {
      name: 'heroImage',
      title: 'Hero Banner Image',
      description: 'A banner image that fits the full width of the banner',
      type: 'localeCsodImage',
    },
    {
      name: 'textBlock',
      title: 'Text Block',
      type: 'textBlock',
      description: 'Use a <span> tag in the heading field to put heading text on a new line in the Roboto font. eg: <span>We make it simple.</span>',
    },
  ],
  preview: {
    select: {
      title: 'textBlock.headingText',
      subtitle: '_type',
      background: 'heroImage',
    },
    prepare: localizePreview(({ title, subtitle, background }) => ({
      title,
      subtitle,
      media: background,
    })),
    component: SectionPreview,
  },
};
