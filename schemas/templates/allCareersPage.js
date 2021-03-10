import { routeField } from '../sharedFields';

export default {
  name: 'allCareersPage',
  title: 'All Careers Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the page',
    },
    routeField('blue'),
    {
      name: 'searchBar',
      title: 'Search Bar',
      type: 'reference',
      to: [{ type: 'searchBar' }],
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'text',
      description: 'Heading to show at the top of the page',
    },
    {
      name: 'videoButton',
      title: 'Video Button',
      type: 'videoButtonV1',
      description: 'Video button to show at the top of the page',
    },
    {
      title: 'Quotes',
      name: 'quotes',
      type: 'array',
      of: [{ type: 'titleQuote' }],
      description: 'Set of quotes to show about careers',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Feature Icons',
      name: 'features',
      type: 'array',
      of: [{ type: 'featureIcon' }],
    },
    {
      title: 'Careers Slider',
      name: 'careersSlider',
      type: 'careersSlider',
    },
    {
      name: 'jobsLocationsTitle',
      title: 'Jobs Locations Title',
      description: 'Title to show for job requisitions per location',
      type: 'string',
    },
    {
      title: 'Disclaimer',
      name: 'disclaimer',
      type: 'blockContentSectionV1',
    },
    {
      title: 'CTA Section',
      name: 'ctaSection',
      type: 'reference',
      to: [{ type: 'bubbleCtaReference1' }],
    },
  ],
};
