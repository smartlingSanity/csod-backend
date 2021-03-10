import {
  bubbleCtaField,
  enabledLocaleField,
  bubbleCtaFieldInitialValue,
  routeField,
} from '../sharedFields';
import { localizePreview } from '../utils';

export default {
  name: 'cccPage',
  title: 'Content Course Catalog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    enabledLocaleField(),
    routeField(),
    {
      name: 'backgroundImage',
      title: 'Page Background Image',
      type: 'localeCsodImage',
    },
    {
      name: 'carouselCard',
      title: 'Carousel Card',
      type: 'carouselCard',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'catalogCtaText',
      title: 'Text for catalog cta',
      type: 'localeString',
    },
    {
      name: 'animatedButton',
      title: 'Animated Button',
      type: 'animatedButton',
    },
    bubbleCtaField,
  ],
  initialValue: {
    ...bubbleCtaFieldInitialValue,
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'catalogCtaText',
      media: 'backgroundImage',
    },
    prepare: localizePreview(selection => selection),
  },
};
