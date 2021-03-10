// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client';
import {
  routeField, scheduledPublishTime,
  enabledLocaleField,
} from '../sharedFields';
import { localizePreview } from '../utils';
import validation from '../utils/validation';

export default {
  name: 'pressReleasePage',
  title: 'Press Release',
  type: 'document',
  initialValue: async () => ({
    isInvestorRelease: false,
    companyDescriptions: [
      await client.fetch(`//groq
        *[_type=="companyDescription" && name=="Cornerstone OnDemand, Inc."]{
          "_type": 'reference',
          "_key": _id,
          "_ref": _id,
        }[0]
      `),
    ],
  }),
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'postDate',
      title: 'Post Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    enabledLocaleField(),
    routeField(true),
    {
      name: 'isInvestorRelease',
      title: 'Is Investor Release',
      type: 'boolean',
    },
    {
      title: 'Sections',
      name: 'sections',
      type: 'array',
      description: 'Text content that will be shown to users for reading',
      of: [{ type: 'blockContentSection' }],
    },
    {
      name: 'companyDescriptions',
      title: 'Company Descriptions',
      description: 'Description of companies related to the press release',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'companyDescription' }],
        },
      ],
    },
    scheduledPublishTime,
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
