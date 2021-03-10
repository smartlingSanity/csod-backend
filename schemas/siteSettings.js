import client from 'part:@sanity/base/client'; /* eslint-disable-line */
import link from './atoms/link';

const linkFields = link.fields.filter(field => field.name === 'link')[0];
const linkFieldTypes = linkFields.of.filter(fieldType => fieldType.type !== 'fileLink' && fieldType.type !== 'phoneNumber');

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'gdprBannerText',
      title: 'Banner Text',
      description: 'eg, By using our website, you are consenting to our use of cookies, as described in our privacy policy.\n'
          + 'You can change your cookie settings at any time. ',
      type: 'array',
      of: [{
        title: 'Text',
        type: 'block',
        styles: [],
        marks: {
          annotations: [{
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'link',
                title: 'Internal or External Link',
                type: 'array',
                of: [...linkFieldTypes],
                validation: Rule => Rule.max(1).error('You can only choose one link'),
              },
            ],
          }],
          decorators: [],
        },
        lists: [],
      },
      ],
      fieldset: 'gdprBannerSettings',
      validation: Rule => Rule.required(),
    },
    {
      name: 'gdprAgreeButtonText',
      title: 'Agree Button',
      description: 'eg "Agree"',
      type: 'string',
      fieldset: 'gdprBannerSettings',
      validation: Rule => Rule.required(),
    },
    {
      name: 'gdprDisagreeButtonText',
      title: 'Disagree Button',
      description: 'eg "Disagree"',
      type: 'string',
      fieldset: 'gdprBannerSettings',
      validation: Rule => Rule.required(),
    },
  ],
  fieldsets: [
    {
      name: 'gdprBannerSettings',
      title: 'GDPR Banner Settings',
      description: 'These are the fields that control the text shown in the GDPR banner at the top of the website',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  validation: Rule => Rule.custom((document) => {
    console.log(document);
    return client.fetch(`*[_type == "siteSettings" && _id != "${document._id}"]`).then(result => (result.length > 1 ? 'There can be only one "Site Settings" document' : true));
  }),

};
