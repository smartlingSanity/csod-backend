import { enabledLocaleField } from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'allResourcesPage',
  title: 'All Resources Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Title of the page',
    },
    enabledLocaleField(),
    {
      name: 'route',
      title: 'Route',
      type: 'reference',
      to: [{ type: 'route' }],
      description: 'Menu text color is white',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slant Banner',
      name: 'slantBanner',
      type: 'slantBanner',
      description: 'Slant banner to show at the top of the page',
      validation: Rule => Rule.required(),
    },
    {
      name: 'backToResourcesLink',
      title: 'Back to Resources Link',
      type: 'link',
      description:
        'Link to show on every resource detail page to go back to resources',
    },
    {
      name: 'thankYouPageLink',
      title: 'Thank You Page Link',
      type: 'link',
      description: 'Link for every downloadable asset',
    },
    {
      title: 'Form',
      name: 'form',
      type: 'form',
      description: 'Form to show for gated resources',
    },
    {
      title: 'Filter',
      name: 'filter',
      type: 'reference',
      to: { type: 'filterMenu' },
      description: 'Filter for resources',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'route.slug.current',
    },
    prepare: localizePreview(selection => selection),
  },
};
