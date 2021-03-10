import { pageDimensions } from '../../../../../../frontend/src/styles/base';
import { validateImage } from '../../../../sharedValidators';

export default {
  name: 'customBackground',
  title: 'Custom Background',
  type: 'document',
  fields: [
    {
      title: 'Background Name',
      name: 'backgroundName',
      description: 'Label used to find this background within Sanity '
          + '(eg when you want to re-use this background in another section)',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Dark Background',
      name: 'darkBackground',
      description: 'Select if the background is dark so components know to use white text',
      type: 'boolean',
    },
    {
      title: 'Desktop image',
      description: `Image should be ${pageDimensions.rawLargeDesktopWidth} px wide`,
      name: 'desktopBgImage',
      type: 'image',
      validation: Rule => [Rule.required(),
        Rule.custom(image => validateImage(image, {
          width: pageDimensions.rawLargeDesktopWidth,
        })),
      ],
    },
    {
      title: 'Tablet image',
      description: `Optional, but is good for user experience.
         Image should be ${pageDimensions.rawTabletWidth}px wide`,
      name: 'tabletBgImage',
      type: 'image',
      validation: Rule => Rule.custom(image => validateImage(image, {
        width: pageDimensions.rawTabletWidth,
      })),
    },
    {
      title: 'Mobile image',
      description: `Optional, but is good for user experience. 
         Image should be ${pageDimensions.rawMobileWidth}px wide`,
      name: 'mobileBgImage',
      type: 'image',
      validation: Rule => Rule.custom(image => validateImage(image, {
        width: pageDimensions.rawMobileWidth,
      })),
    },
    {
      title: 'Desktop Styles',
      description: 'Adjust padding, margin, and background positions',
      name: 'desktopStyles',
      type: 'customBackgroundStyles',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Tablet Styles',
      description: 'Adjust padding, margin, and background position',
      name: 'tabletStyles',
      type: 'customBackgroundStyles',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Mobile Styles',
      description: 'Adjust padding, margin, and background positions',
      name: 'mobileStyles',
      type: 'customBackgroundStyles',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
};
