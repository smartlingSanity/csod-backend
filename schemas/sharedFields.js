/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import React from 'react';
import _ from 'lodash';
import client from 'part:@sanity/base/client';
import AutoGenerateRoute from '../src/components/AutoGenerateRoute';
import { getLocale } from '../config/intlConfig';
import ReturnToPage from '../src/components/ReturnToPage';

import validation from './utils/validation';
import { localizePreview } from './utils';
import LocalePicker from '../src/components/LocalePicker';

export const routeField = (
  autoGenerate = false,
  matchRouteRegex = null,
  matchRouteDescription,
) => ({
  name: 'route',
  title: 'Page URL',
  type: 'reference',
  to: [{ type: 'route' }],
  inputComponent: autoGenerate && AutoGenerateRoute,
  validation: Rule => [
    Rule.required(),
    Rule.custom(async (route, context) => {
      const documentHasRouteField = _.has(context, 'document.route');
      if (documentHasRouteField) {
        const currentDocId = context.document._id
          .toString()
          .replace('drafts.', '');
        const pagesRefRoute = await client.fetch(`//groq
          *[route._ref == "${route._ref}"
            && _id != "${currentDocId}"
            && !(_id match "${currentDocId}")
            && !(_id in path("drafts.**"))]
        `);
        if (!_.isEmpty(pagesRefRoute)) {
          return {
            message: 'This page URL is already in use',
            paths: ['route'],
          };
        }
        return true;
      }
      return true;
    }),
    Rule.custom(async (route, context) => {
      if (!matchRouteRegex) {
        return true;
      }
      const documentHasRouteField = _.has(context, 'document.route');
      if (documentHasRouteField) {
        const routes = await client.fetch(`//groq
          *[_type == "route" && _id == "${route._ref}"]
        `);
        if (_.isEmpty(routes)) {
          return {
            message: 'This page URL does not exist',
            paths: ['route'],
          };
        }
        const routeDocument = _.head(routes);
        if (!_.get(routeDocument, 'slug.current', '').match(matchRouteRegex)) {
          return {
            message: `This page URL does not match the pattern "${matchRouteDescription}"`,
            paths: ['route'],
          };
        }
        return true;
      }
      return true;
    }),
  ],
  description: autoGenerate ? (
    'This route is auto-generated'
  ) : (
    <p>
      <ReturnToPage docType="route">
        Add new URL
        {matchRouteRegex && matchRouteDescription && (
          <span>
            {' '}
            (format:
            {matchRouteDescription}
            )
          </span>
        )
        }
      </ReturnToPage>
      {' '}
      or select an existing one
    </p>
  ),
});

export const suiteTypeField = {
  name: 'suiteType',
  title: 'Product Category Type',
  type: 'string',
  options: {
    list: [
      { title: 'Careers', value: 'careers' },
      { title: 'Content Anytime', value: 'contentAnytime' },
      { title: 'Development', value: 'development' },
      { title: 'HR', value: 'hr' },
      { title: 'Learning', value: 'learning' },
      { title: 'Performance', value: 'performance' },
      { title: 'Recruiting', value: 'recruiting' },
    ],
    layout: 'radio',
  },
  validation: Rule => Rule.required(),
};

export const smbRouteMatch = {
  regex: /\/smb\/.*/,
  regexDescription: '/smb/[your-url]',
};

export const bubbleCtaField = {
  title: 'Bubble CTA Section',
  name: 'bubbleCtaSection',
  description:
    'If nothing is selected, no Bubble CTA Section will be displayed',
  type: 'reference',
  to: [{ type: 'bubbleCtaReference1' }],
  options: {
    filter: ({ document }) => ({
      filter: '__i18n_lang == $locale',
      params: {
        locale: document.__i18n_lang,
      },
    }),
  },
};

// localization NA
export const bubbleCtaFieldInitialValue = {
  bubbleCtaSection: {
    _type: 'reference',
    _ref: 'dcce6367-f432-4f3d-97f1-be84d2373011',
  },
};

export const sharedTilesField = {
  title: 'Tiles Section',
  name: 'sharedTilesReference',
  description: 'If nothing is selected, no Tiles Section will be displayed',
  type: 'reference',
  to: [{ type: 'sharedTilesReference' }],
};

export const sectionsDescription = (
  <p>
    Gallery of sections can be viewed here in Storybook:
    <a href="https://tinyurl.com/uvtwdw7">https://tinyurl.com/uvtwdw7</a>
  </p>
);

const spacingValues = [
  { title: '0px', value: 'none' },
  { title: '10px', value: 'nano' },
  { title: '20px', value: 'micro' },
  { title: '30px', value: 'xsmall' },
  { title: '60px', value: 'small' },
  { title: '90px', value: 'medium' },
  { title: '110px', value: 'large' },
  { title: '140px', value: 'xlarge' },
  { title: '170px', value: 'xxlarge' },
];

export const spacingOptions = {
  options: {
    list: spacingValues,
    layout: 'list',
  },
};

export const paddingTop = {
  name: 'paddingTop',
  title: 'Padding Top',
  type: 'string',
  options: {
    list: spacingValues,
    layout: 'list',
  },
};

export const paddingBottom = {
  name: 'paddingBottom',
  title: 'Padding Bottom',
  type: 'string',
  options: {
    list: spacingValues,
    layout: 'list',
  },
};

export const backgroundColor = {
  name: 'backgroundColor',
  title: 'Background Color (deprecate after migration to customBackground)',
  description: 'A background color for the entire section',
  type: 'string',
  options: {
    list: [
      { title: 'Light Gray', value: 'lightGray' },
      { title: 'Dark Gray', value: 'darkGray' },
      { title: 'Primary', value: 'primary' },
      { title: 'White', value: 'white' },
      { title: 'Transparent', value: 'transparent' },
    ],
  },
};

export const marginTop = {
  name: 'marginTop',
  title: 'Margin Top (in pixels, can be negative. Ex. -60)',
  description: 'This can be used to pull a section up so it overlaps with another section',
  type: 'number',
};

export const marginTopPercentage = {
  name: 'marginTopPercentage',
  title: 'Margin Top Percentage?',
  description: 'Use only if you wish to use percent instead of px',
  type: 'boolean',
};

export const marginBottom = {
  name: 'marginBottom',
  title: 'Margin Bottom (in pixels, can be negative. Ex. -60)',
  description: 'This can be used to pull a subsequent section up so it overlaps with this section',
  type: 'number',
};

export const backgroundPositionY = {
  name: 'backgroundPositionY',
  title: 'Background Vertical Position (in pixels) (deprecate after migration to customBackground)',
  description: 'This can be used to push a background image down the page, useful for MultiSection component',
  type: 'number',
};

export const companyName = {
  name: 'companyName',
  title: 'Company Name',
  type: 'localeString',
  validation: Rule => Rule.custom(validation.requiredByLocale),
};

export const partnerFilterSegment = [
  {
    name: 'name',
    title: 'Name',
    type: 'localeString',
  },
];

export const scheduledPublishTime = {
  name: 'scheduledPublishTime',
  title: 'Scheduled Publish Time',
  description: `Your content will be live 3-10 minutes after this time. If you press "Publish" before this time, 
    this document will go live the next time a site build is performed.`,
  type: 'richDate',
  options: {
    timeStep: '15',
  },
};

export const filterDocumentPreview = childName => ({
  select: {
    title: 'title',
    _type: '_type',
    item0: `${childName}.0.title`,
    item1: `${childName}.1.title`,
    item2: `${childName}.2.title`,
    item3: `${childName}.3.title`,
  },
  prepare: localizePreview(({
    title, _type, item0, item1, item2, item3,
  }) => {
    const items = [item0, item1, item2].filter(Boolean);
    const subtitle = childName ? items.join(', ') : _.startCase(_type);
    const hasMoreItems = Boolean(item3);
    return {
      title,
      subtitle: hasMoreItems ? `${subtitle}...` : subtitle,
    };
  }),
});

export const allSectionTypes = [
  { type: 'blockContentSection' },
  { type: 'biographyBlockSection' },
  { type: 'carouselSection' },
  { type: 'cccTileSection' },
  { type: 'clientCarouselSection' },
  { type: 'clientCarouselSectionV1' },
  { type: 'clientTileSection' },
  { type: 'customerStatsSection' },
  { type: 'ctaCardsSection' },
  { type: 'formSection' },
  { type: 'gradientCard' },
  { type: 'gtmSection' },
  { type: 'iconGridSection' },
  { type: 'iconHeadingSection' },
  { type: 'iconTextBlockSection' },
  // TODO: remove this multiSection after migration
  { type: 'multiSection' },
  { type: 'oneColumnSection' },
  { type: 'productSegmentSection' },
  { type: 'quoteGradientCard' },
  { type: 'quoteLogoSlider' },
  { type: 'quoteLogoSliderV1' },
  { type: 'radialIconSection' },
  { type: 'statsCounterSection' },
  { type: 'suiteCards' },
  { type: 'suiteIconGridSection' },
  { type: 'threeCardSection' },
  { type: 'tilesSection' },
  { type: 'timelineSection' },
  { type: 'twoColumnSection' },
  { type: 'twoColumnTextSection' },
  {
    type: 'reference',
    title: 'Tiles Section References',
    to: [{ type: 'sharedTilesReference' }],
  },
];


export const allBannerTypes = [
  { type: 'aiBanner' },
  { type: 'allClientsSlantBanner' },
  { type: 'clientSlantBanner' },
  { type: 'gtmSlantBanner' },
  { type: 'heroBanner' },
  { type: 'industrySlantBanner' },
  { type: 'officeLocationSlantBanner' },
  { type: 'slantBanner' },
  { type: 'smbSlantBanner' },
  { type: 'subscriptionSlantBanner' },
  { type: 'suiteBannerSection' },
  { type: 'suiteBenefitsBanner' },
];


export const sectionsField = (desiredSections = [], desiredBanners = []) => {
  const filteredSections = desiredSections !== 'allSections' ? allSectionTypes
    .filter(section => desiredSections.includes(section.type)) : allSectionTypes;
  const filteredBanners = desiredBanners !== 'allBanners' ? allBannerTypes
    .filter(banner => desiredBanners.includes(banner.type)) : allBannerTypes;

  return {
    title: 'Sections',
    name: 'sections',
    description: sectionsDescription,
    type: 'array',
    of: filteredBanners.concat(filteredSections),
    validation: Rule => Rule.custom((sections) => {
      const { dataset } = client.config();

      if (getLocale(dataset) === 'us') {
        const multiSectionDetected = sections.filter(section => section._type === 'multiSection').length > 0;
        if (multiSectionDetected) {
          return 'MultiSection is disabled on US dataset';
        }
        if (sections.filter(section => section._type === 'clientCarouselSection').length > 0) {
          return 'Client Carousel Section is disabled on US dataset, use Client Carousel Section V1 instead';
        }
        if (sections.filter(section => section._type === 'quoteLogoSlider').length > 0) {
          return 'Quote Logo Slider is disabled on US dataset, use Quote Logo Slider V1 instead';
        }
      }

      return true;
    }),
  };
};

export const enabledLocaleField = (showAll = true) => ({
  name: 'enabledLocale',
  title: 'Enabled Locale',
  type: 'string',
  options: { showAll },
  validation: Rule => Rule.required(),
  inputComponent: LocalePicker,
});

export default {
  sectionsField,
  bubbleCtaField,
  filterDocumentPreview,
  enabledLocaleField,
  paddingBottom,
  paddingTop,
  partnerFilterSegment,
  spacingOptions,
  suiteTypeField,
};
