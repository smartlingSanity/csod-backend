import { enabledLocaleField } from '../sharedFields';

export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Title of the Event',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    enabledLocaleField(false),
    {
      name: 'eventType',
      title: 'Event or Webinar',
      type: 'string',
      description: 'Tag on UI card, used for searching',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Event', value: 'event' },
          { title: 'Webinar', value: 'webinar' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'location',
      title: 'Location',
      description: 'Ex: Iowa City, IA',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      description: 'When is this event happening MM-DD-YYYY',
      type: 'date',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link',
      description: 'url to event',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'csodImage',
      validation: Rule => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      date: 'eventDate',
      media: 'thumbnail',
    },
  },
};
