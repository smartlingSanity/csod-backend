import client from 'part:@sanity/base/client';

export default {
  name: 'groupEntity',
  title: 'Group',
  type: 'document',
  readOnly: true,
  fields: [
    {
      name: 'groupEntityID',
      title: 'Group ID',
      type: 'string',
      hidden: true,
    },
    {
      name: 'groupEntityName',
      title: 'Group Name',
      type: 'string',
      validation: Rule => [
        Rule.required().error('Group Name is required.'),
        Rule.custom(async (groupEntityName, { document }) => {
          try {
            if (document) {
              if (typeof groupEntityName !== 'undefined') {
                const id = document._id.toString().replace('drafts.', '');
                const type = document._type.toString();
                const reservedGroupNames = [
                  'csod.group.sanity_administrators',
                  'csod.group.sanity_editors',
                  'csod.group.sanity_read_only',
                  'administrator',
                  'create-session',
                  'public',
                  'read',
                  'write',
                ];
                const formattedGroupName = `csod.group.${groupEntityName.toString()
                  .replace(/\s/g, '_')
                  .replace(/[^a-zA-Z0-9_]/g, '')
                  .toLowerCase()}`;

                if (formattedGroupName in reservedGroupNames) {
                  return `Group name '${groupEntityName}' is Reserved. Select another name`;
                }

                const otherGroupQuery = '*[_type == "$docType" && groupEntityID == "$formattedGroupName" && !(_id match "drafts.$docID" || _id match "$docID")]';
                const otherGroupParams = {
                  docType: type,
                  formattedGroupName,
                  docID: id,
                };
                const otherGroupIDs = await client.fetch(otherGroupQuery, otherGroupParams);

                if (otherGroupIDs.length > 0) {
                  return `Name conflicts with ${otherGroupIDs[0].groupEntityName}`;
                }

                // eslint-disable-next-line no-param-reassign
                document.groupEntityID = formattedGroupName;
              }
              return true;
            }
            return 'Required';
          } catch (error) {
            return error.message;
          }
        }),
      ],
    },
    {
      name: 'groupEntityDescription',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'groupEntityGrants',
      title: 'Granted Permissions',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Permissions',
          to: [{ type: 'grantEntity' }],
        },
      ],
      validation: Rule => Rule.required().error('Permissions Required.'),
    },
    {
      name: 'groupEntityMembers',
      title: 'Members',
      description: 'Users that belongs to this group',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Users',
          to: [{ type: 'userEntity' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'groupEntityName',
      subtitle: 'groupEntityDescription',
    },
  },
};
