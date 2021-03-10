import validation from '../utils/validation';

/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import ResourceTypeInput from '../../src/components/ResourceTypeInput';
import {
  routeField,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'resourceDetailPage',
  title: 'Resource Detail Page',
  description: 'Resource pages from resource corner',
  type: 'document',
  inputComponent: ResourceTypeInput,
  initialValue: () => ({
    publishDate: new Date().toISOString(),
  }),
  fieldsets: [{ name: 'chooseResourceType', title: 'Choose Resource Type' }],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description:
        'To ungate this page and not display the form add the bypass url parameter Ex. https://csod.com/resource-page-url?bypass=true',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    enabledLocaleField(),
    routeField(true),
    {
      name: 'publishDate',
      title: 'Publish Date',
      description: 'Publish date of the resource',
      type: 'datetime',
      hidden: true,
    },
    {
      name: 'logo',
      title: 'Resource Tile Image',
      description:
        'Recommended size 285 x 120 px. Default image will be displayed if empty.',
      type: 'localeCsodImage',
    },
    {
      name: 'resourceType',
      title: 'Resource Type',
      type: 'reference',
      fieldset: 'chooseResourceType',
      description: 'The asset type of the resource',
      to: [{ type: 'filterItem' }],
      options: {
        filter: () => ({
          filter: 'name in $assetTypes',
          params: {
            assetTypes: [
              'Article',
              'Brief',
              'Case Study',
              'Datasheet',
              'Infographic',
              'Research',
              'Video',
              'Webinar',
              'Whitepaper',
            ],
          },
        }),
      },
    },
    {
      title: 'Resource Page Content',
      name: 'sections',
      type: 'array',
      fieldset: 'chooseResourceType',
      description: 'This will be displayed on the Resource Page',
      of: [{ type: 'blockContentSection' }],
    },
    {
      name: 'file',
      title: 'File',
      type: 'localeFile',
      fieldset: 'chooseResourceType',
      description: 'Asset that user can download (pdf, doc, etc.). '
          + 'If a file is uploaded, the "Resource Corner Text" will be the "Download {Asset Type}" text.',
    },
    {
      name: 'video',
      title: 'Video Asset',
      type: 'video',
      fieldset: 'chooseResourceType',
      description: 'Video that user can play',
    },
    {
      name: 'eventLink',
      title: 'Webinar Link',
      type: 'link',
      fieldset: 'chooseResourceType',
    },
    {
      name: 'eventDate',
      title: 'Webinar Date',
      type: 'datetime',
      fieldset: 'chooseResourceType',
    },
    {
      name: 'filterItems',
      title: 'Asset Category',
      description: 'Set of items this resource can be filtered by',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'filterItem' }],
          title: 'Asset Category',
        },
      ],
    },
    {
      name: 'relatedResources',
      title: 'Related Resources',
      description: 'Set resources related to this one',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'resourceDetailPage' }] }],
    },
    {
      name: 'overrideCampaignId',
      title: 'Override Campaign Id',
      description: 'Set this value here to override the default Resource Corner campaign ID',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      resourceType: 'resourceType.title',
      slug: 'route.slug.current',
    },
    prepare: localizePreview((selection) => {
      const { resourceType, slug } = selection;
      return Object.assign({}, selection, {
        subtitle: `${resourceType} (${slug})`,
      });
    }),
  },
  orderings: [
    {
      title: 'Title Ascendant',
      name: 'titleAsc',
      by: [{ field: 'title.us', direction: 'asc' }],
    },
    {
      title: 'Title Descendant',
      name: 'titleDesc',
      by: [{ field: 'title.us', direction: 'desc' }],
    },
    {
      title: 'Resource Type Ascendant',
      name: 'resourceTypeAsc',
      by: [{ field: 'resourceType.title.us', direction: 'asc' }],
    },
    {
      title: 'Resource Type Descendant',
      name: 'resourceTypeDesc',
      by: [{ field: 'resourceType.title.us', direction: 'desc' }],
    },
  ],
};
