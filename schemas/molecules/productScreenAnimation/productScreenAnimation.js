export default {
  title: 'Product Screen Animation',
  name: 'productScreenAnimation',
  description:
    'Upload the json file exported from After Effects via BodyMovin/Lottie, and then add the various settings below',
  type: 'object',
  fieldsets: [
    {
      name: 'advanced',
      title: 'Advanced Settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'productScreenAnimationFile',
      title: 'JSON File from After Effects',
      description:
        'Upload the JSON from After Effects. You can add a "resizeWidith" property to each image in the JSON to have them resized for you',
      type: 'productScreenAnimationFile',
    },
    {
      name: 'screenTilt',
      title: 'Screen Tilt',
      description: 'Choose which way the screen should tilt',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'No Tilt', value: 'none' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      title: 'Supporting Images',
      name: 'supportingImages',
      description: 'These are the images exported from After Effects.',
      type: 'array',
      of: [{ type: 'csodImage' }],
    },
    {
      name: 'placeholder',
      title: 'Placeholder Image',
      description:
        'This image will be shown while the animation is loading, should be an image of the first frame of the animation.',
      type: 'csodImage',
      validation: Rules => Rules.required(),
    },
    {
      name: 'secondaryImage',
      title: 'Secondary Image',
      description:
        'Select an image that will be displayed in front of or behind the product screen (depending on the custom CSS you add)',
      type: 'csodImage',
      fieldset: 'advanced',
    },
    {
      name: 'customCss',
      title: 'Custom Css',
      description:
        'Add CSS to modify the size and position of the screen animation or the Secondary Image',
      type: 'text',
      fieldset: 'advanced',
    },
  ],
  preview: {
    select: {
      title: 'productScreenAnimationFile.asset.originalFilename',
      subtitle: '_type',
    },
  },
};
