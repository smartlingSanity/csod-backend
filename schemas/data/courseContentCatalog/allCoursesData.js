export default {
  name: 'course',
  title: 'Courses',
  type: 'document',
  readOnly: true,
  fields: [
    {
      name: 'courseTitle',
      title: 'Course Title',
      type: 'string',
    },
    {
      name: 'primarySkill',
      title: 'Primary Skill',
      type: 'string',
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
    },
    {
      name: 'provider',
      title: 'Provider',
      type: 'string',
    },
    {
      name: 'subscription',
      title: 'Subscription',
      type: 'string',
    },
    {
      name: 'courseLanguage',
      title: 'Language of Course',
      type: 'string',
    },
    {
      name: 'thumbnailFile',
      title: 'Thumbnail File Name',
      type: 'string',
    },
    {
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
    },
  ],
};
