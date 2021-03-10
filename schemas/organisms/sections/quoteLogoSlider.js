import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { localizePreview } from '../../utils';

export default {
  name: 'quoteLogoSlider',
  title: 'Quote Logo Slider',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'localeCsodImage',
    },
    {
      name: 'clientLogosAndQuotes',
      title: 'Client Quote',
      type: 'array',
      of: [{ type: 'clientQuote' }],
    },
  ],
  preview: {
    select: {
      title: '_type',
      subtitle: '_type',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      title,
      media,
      subtitle,
      background,
    }) => ({
      title,
      media,
      subtitle,
      background,
    })),
    component: SectionPreview,
  },
};
