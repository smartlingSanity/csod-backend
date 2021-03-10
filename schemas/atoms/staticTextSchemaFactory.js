export default function staticTextSchemaFactory({ name, title }) {
  return {
    type: 'document',
    name,
    title,
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'content',
        title: 'Content',
        type: 'localeString',
      },
    ],
  };
}
