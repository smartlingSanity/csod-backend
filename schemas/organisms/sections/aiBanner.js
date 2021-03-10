import { localizePreview } from '../../utils/index';

export default {
  name: 'aiBanner',
  title: 'AI Banner',
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
      name: 'aiBannerHeading',
      title: 'AI Banner Heading',
      description: 'The rainbow heading under the AI logo',
      type: 'localeString',
    },
    {
      name: 'aiBannerText',
      title: 'AI Banner Text',
      description: 'The text under the rainbow heading',
      type: 'localeText',
    },
    {
      name: 'dataSectionHeading',
      title: 'Data Section Heading',
      description: 'Heading in the section with binary',
      type: 'localeString',
    },
    {
      name: 'dataSectionText',
      title: 'Data Section Text',
      description: 'Text in the section with binary',
      type: 'localeText',
    },
  ],
  preview: {
    select: {
      title: 'aiBannerHeading',
      subtitle: '_type',
    },
    prepare: localizePreview(selection => selection),
  },
};
