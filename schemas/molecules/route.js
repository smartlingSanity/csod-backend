import validation from '../utils/validation';
import SlugText from '../../src/components/SlugText';
import { localizePreview } from '../utils';

export const ogMeta = {
  fieldset: {
    name: 'ogMeta',
    title: 'Open Graph Meta Data',
    options: { collapsible: true, collapsed: true },
  },
  fields: [
    {
      name: 'ogTitle',
      title: 'og:title',
      description:
        'The title of your article without any branding such as your site name. Defaults to the Meta Title above',
      type: 'localeString',
      fieldset: 'ogMeta',
    },
    {
      name: 'ogDescription',
      title: 'og:description',
      description:
        'A brief description of the content, usually between 2 and 4 sentences. This will displayed below the title of the post on Facebook. Defaults to the Meta Description field above',
      type: 'localeText',
      fieldset: 'ogMeta',
    },
    {
      name: 'ogType',
      title: 'og:type',
      description:
        'The type of media of your content. This tag impacts how your content shows up in News Feed. If you don\'t specify a type,the default is website. Each URL should be a single object, so multiple og:type values are not possible. Find the full list of object types in Object Types Reference. Defaults to "website"',
      type: 'localeString',
      fieldset: 'ogMeta',
    },
    {
      name: 'ogLocale',
      title: 'og:locale',
      description:
        'The locale of the resource. You can also use og:locale:alternate if you have other available language translations available. Learn about the locales we support in our documentation on localization. Defaults to en_US.',
      type: 'localeString',
      fieldset: 'ogMeta',
    },
    {
      name: 'ogImage',
      title: 'og:image',
      description:
        "To update an image after it's been published, use a new image name for the new image. Images are cached based on the URL and won't be updated unless the image name changes.",
      type: 'localeCsodImage',
      fieldset: 'ogMeta',
      validation: Rule => Rule.custom(csodImage => (csodImage && !csodImage.alt ? 'Alt text is required' : true)),
    },
  ],
};

export const twitterMeta = {
  fieldset: {
    name: 'twitterMeta',
    title: 'Twitter Meta Data',
    options: { collapsible: true, collapsed: true },
  },
  fields: [
    {
      name: 'twitterCard',
      title: 'twitter:card',
      description:
        'The format of your Twitter Card, eg, summary_large_image. Defaults to "summary"',
      type: 'localeString',
      fieldset: 'twitterMeta',
    },
    {
      name: 'twitterSite',
      title: 'twitter:site',
      description:
        'The Twitter @username the card should be attributed to. Defaults to the Twitter account specified in your locale settings',
      type: 'localeString',
      fieldset: 'twitterMeta',
    },
    {
      name: 'twitterTitle',
      title: 'twitter:title',
      description:
        'A concise title for the related content. Platform specific behaviors: '
        + 'iOS, Android: Truncated to two lines in timeline and expanded Tweet; Web: Truncated '
        + 'to one line in timeline and expanded Tweet',
      type: 'localeString',
      fieldset: 'twitterMeta',
      validation: Rule => Rule.max(70),
    },
    {
      name: 'twitterDescription',
      title: 'twitter:description',
      description:
        'A description that concisely summarizes the content as appropriate for presentation within a Tweet. You should not re-use the title as the description or use this field to describe the general services provided by the website. Platform specific behaviors:\n'
        + '\n'
        + '    iOS, Android: Not displayed\n'
        + '    Web: Truncated to three lines in timeline and expanded Tweet\n',
      type: 'localeText',
      fieldset: 'twitterMeta',
      validation: Rule => Rule.max(200),
    },
    {
      name: 'twitterImage',
      title: 'twitter:image',
      description:
        'An image representing the content of the page. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.',
      type: 'localeCsodImage',
      fieldset: 'twitterMeta',
      validation: Rule => Rule.custom(csodImage => (csodImage && !csodImage.alt ? 'Alt text is required' : true)),
    },
  ],
};

export default {
  name: 'route',
  title: 'Page URL',
  type: 'document',
  fieldsets: [ogMeta.fieldset, twitterMeta.fieldset],
  fields: [
    {
      name: 'routeName',
      title: 'Name',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'slug',
      title: 'Page URL',
      description:
        'A forward slash must used at the beginning of a page URL. Ex. /page-title',
      type: 'slug',
      validation: Rule => Rule.required().custom(slug => (slug.current.slice(0, 1) === '/'
        ? true
        : 'Page URLs must start with a "/"')),
      inputComponent: SlugText,
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      description:
        'An empty meta title defaults to "Name | Cornerstone". A custom meta title does NOT automatically append " | Cornerstone"',
      type: 'localeString',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localeText',
    },
    {
      name: 'metaKeywords',
      title: 'Meta Keywords',
      description: 'Comma separated list of keywords',
      type: 'localeString',
    },
    ...ogMeta.fields,
    ...twitterMeta.fields,
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      routeName: 'routeName',
      slug: 'slug.current',
      enabled: 'enabled',
    },
    prepare: localizePreview((selection) => {
      const { routeName, slug } = selection;
      return {
        title: slug,
        subtitle: routeName,
      };
    }),
  },
};
