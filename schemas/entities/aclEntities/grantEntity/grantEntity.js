export default {
  name: 'grantEntity',
  title: 'Grant',
  type: 'document',
  readOnly: true,
  fields: [
    {
      name: 'grantEntityID',
      title: 'Grant Name',
      type: 'string',
      hidden: true,
    },
    {
      name: 'grantEntityName',
      title: 'Grant Name',
      type: 'string',
    },
    {
      name: 'grantEntityDescription',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'grantEntityFilters',
      title: 'Filter Query String',
      type: 'string',
    },
    {
      name: 'grantEntityPermissions',
      title: 'Permissions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Create', value: 'create' },
          { title: 'Read', value: 'read' },
          { title: 'Update', value: 'update' },
          { title: 'Manage', value: 'manage' },
          { title: 'History', value: 'history' },
          { title: 'Edit History', value: 'editHistory' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'grantEntityName',
      subtitle: 'grantEntityDescription',
    },
  },
};
