export default {
  name: 'fileLink',
  title: 'File Link',
  type: 'object',
  fields: [
    {
      title: 'File',
      name: 'fileLink',
      type: 'localeFile',
      description: 'Asset that user can download (pdf, doc, docx, image)',
      options: {
        accept: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    },
  ],
};
