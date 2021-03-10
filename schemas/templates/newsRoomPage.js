/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client';
import _ from 'lodash';
import validation from '../utils/validation';
import routeUtils from '../data/utils/route';
import { routeField, enabledLocaleField } from '../sharedFields';
import { localizePreview } from '../utils';

const { createRouteIfNotExists } = routeUtils(client);
const title = 'Newsroom Landing';
const mediaContact = {
  _type: 'pressContact',
  email: 'dirons@csod.com',
  name: 'Deaira Irons',
  phone: '310-752-0164',
  title: 'Media Contact',
};

const investorContact = {
  _type: 'pressContact',
  email: 'jgold@csod.com',
  name: 'Jason Gold',
  phone: '+1 (310) 526-2531 ',
  title: 'Investor Relations Contact',
};

const getInitialPressContact = async (pressContact) => {
  if (pressContact) {
    const queriedPressContact = await client.fetch(`//groq
      *[_type=="pressContact" && name=="${pressContact.name}"][0]
    `);
    const { _id } = _.isEmpty(queriedPressContact)
      ? client.create(pressContact)
      : queriedPressContact;
    return {
      _type: 'reference',
      _key: _id,
      _ref: _id,
    };
  }
  return null;
};

export default {
  name: 'newsRoomPage',
  title,
  type: 'document',
  initialValue: async () => {
    const route = await createRouteIfNotExists({
      name: title,
      slug: '/company/newsroom',
      enabled: true,
    });
    return {
      title,
      banner: {
        _type: 'twoColumnSection',
        leftBlock: {
          _type: 'csodColumn',
          align: false,
          columnAlign: 'left',
          columnBlocks: [
            {
              _key: '065d149cd3e2',
              _type: 'textBlock',
              align: 'left',
              button: [
                {
                  _key: '1a5a6d4060d2',
                  _type: 'button',
                  buttonOutline: true,
                  color: 'white',
                  link: {
                    _type: 'link',
                    link: [
                      {
                        _key: 'a350ce8b3e14',
                        _type: 'externalLink',
                        externalLink:
                          'https://www.forbes.com/sites/robertdefrancesco/2019/10/31/cornerstone-ondemand-sees-a-big-opportunity-in-online-training/#70b22ee44554',
                      },
                    ],
                    text: 'url',
                  },
                  text: 'read the article',
                },
              ],
              descriptionColor: 'white',
              headingText:
                'Cornerstone Sees A Big Opportunity In Online Training',
              headingTextColor: 'white',
            },
          ],
        },
      },
      route: {
        _type: 'reference',
        _ref: route._id,
      },
      pressReleasesTitle: 'Press Releases',
      allPressReleasesTitle: 'all press releases',
      newsCoverageTitle: 'News Coverages',
      allNewsCoveragesTitle: 'all news coverages',
      analystReportsTitle: 'Analyst reports featuring Cornerstone',
      awardsRecognitionTitle: 'Awards & recognition',
      pressContact: await getInitialPressContact(mediaContact),
      investorContact: await getInitialPressContact(investorContact),
    };
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    enabledLocaleField(),
    routeField(),
    {
      name: 'banner',
      title: 'Banner',
      type: 'twoColumnSection',
      options: {
        collapsible: true,
      },
      description: 'Main banner for top news coverage',
    },
    {
      name: 'pressReleasesTitle',
      title: 'Press releases title',
      type: 'localeString',
      description:
        'title for press release section, it will appear above the section',
    },
    {
      name: 'allPressReleasesTitle',
      title: 'All Press Releases Button Text',
      type: 'localeString',
      description: 'Text for all press releases button',
    },
    {
      name: 'newsCoverageTitle',
      title: 'News Coverage Title',
      type: 'localeString',
      description:
        'title for news coverage section, it will appear above the section',
    },
    {
      name: 'allNewsCoveragesTitle',
      title: 'All News Coverages Button Text',
      type: 'localeString',
      description: 'text for all news coverages button',
    },
    {
      title: 'Featured News Coverages',
      name: 'featuredNewsCoverages',
      type: 'array',
      of: [
        {
          type: 'localeNewsCoverageReference',
          validation: Rule => Rule.custom(validation.requiredByLocale),
        },
      ],
      validation: Rule => Rule.max(6),
    },
    {
      name: 'analystReportsTitle',
      title: 'Analyst Reports Title',
      type: 'localeString',
      description:
        'title for analyst reports section, it will appear above the section',
    },
    {
      title: 'Analyst reports featuring Cornerstone',
      name: 'analystReports',
      type: 'array',
      of: [{ type: 'analystReport' }],
      validation: Rule => Rule.max(3),
    },
    {
      name: 'awardsRecognitionTitle',
      title: 'Awards and Recognition Title',
      type: 'localeString',
      description:
        'title for awards and recognition section, it will appear above the section',
    },
    {
      title: 'Awards & recognition',
      name: 'awardsRecognition',
      type: 'array',
      of: [{ type: 'awardsRecognition' }],
      validation: Rule => Rule.max(3),
    },
    {
      title: 'Links Title',
      name: 'linksTitle',
      type: 'localeString',
      description: 'Title for the interest links section in the newsroom page',
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      description: 'Interest links to show in the newsroom page',
      of: [
        {
          type: 'link',
        },
      ],
    },
    {
      title: 'Press Contact',
      name: 'pressContact',
      type: 'reference',
      to: [{ type: 'pressContact' }],
      description:
        'Main press contact for press releases, this person will be automatically added to each press release and displayed on the main press release page',
    },
    {
      title: 'Investor Contact',
      name: 'investorContact',
      type: 'reference',
      to: [{ type: 'pressContact' }],
      description: 'Contact of the investor related to the press release',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: localizePreview(selection => selection),
  },
};
