import sanityClient from '@sanity/client';
import fetch from 'node-fetch';

const uuidv4 = require('uuid/v4');

const _ = require('lodash');

require('dotenv').config();

const sanityJson = require('../../../sanity.json');

const defaultGrants = [
  {
    _id: 'csod.grant.all_read_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_read_grant',
    grantEntityDescription: 'General read permission',
    grantEntityFilters: '!(_id in path("_.groups.**")) && _id in path(\'**\')',
    grantEntityName: 'All Read Grant',
    grantEntityPermissions: [
      'read',
    ],
  },
  {
    _id: 'csod.grant.all_update_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_update_grant',
    grantEntityDescription: 'General update permission',
    grantEntityFilters: '!(_id in path("_.groups.**")) && _id in path(\'**\')',
    grantEntityName: 'All Update Grant',
    grantEntityPermissions: [
      'update',
    ],
  },
  {
    _id: 'csod.grant.all_manage_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_manage_grant',
    grantEntityDescription: 'General manage permission',
    grantEntityFilters: '!(_id in path("_.groups.**")) && _id in path(\'**\')',
    grantEntityName: 'All Manage Grant',
    grantEntityPermissions: [
      'manage',
    ],
  },
  {
    _id: 'csod.grant.all_create_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_create_grant',
    grantEntityDescription: 'General create permission',
    grantEntityFilters: '!(_id in path("_.groups.**")) && _id in path(\'**\')',
    grantEntityName: 'All Create Grant',
    grantEntityPermissions: [
      'create',
    ],
  },
  {
    _id: 'csod.grant.all_history_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_history_grant',
    grantEntityDescription: 'General history permission',
    grantEntityFilters: '!(_id in path("_.groups.**")) && _id in path(\'**\')',
    grantEntityName: 'All History Grant',
    grantEntityPermissions: [
      'history',
    ],
  },
  {
    _id: 'csod.grant.all_edit_history_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_edit_history_grant',
    grantEntityDescription: 'General edit history permission',
    grantEntityFilters: '!(_id in path("_.groups.**")) && _id in path(\'**\')',
    grantEntityName: 'All Edit History Grant',
    grantEntityPermissions: [
      'editHistory',
    ],
  },
  {
    _id: 'csod.acl.all_access_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_access_grant',
    grantEntityDescription: 'Access everything permission',
    grantEntityFilters: '_id in path(\'**\')',
    grantEntityName: 'All Access Grant',
    grantEntityPermissions: [
      'create',
      'read',
      'update',
      'manage',
      'history',
      'editHistory',
    ],
  },
  {
    _id: 'csod.acl.all_read_write_access_grant',
    _type: 'grantEntity',
    grantEntityID: 'all_read_write_access_grant',
    grantEntityDescription: 'Editor Read Write Permission',
    grantEntityFilters: '_id in path(\'**\')',
    grantEntityName: 'All Read Write Access Grant',
    grantEntityPermissions: [
      'create',
      'read',
      'update',
      'history',
    ],
  },
  {
    _id: 'csod.acl.read_only_access_grant',
    _type: 'grantEntity',
    grantEntityID: 'read_only_access_grant',
    grantEntityDescription: 'Read Only Permission',
    grantEntityFilters: '_id in path(\'**\')',
    grantEntityName: 'Read Only Access Grant',
    grantEntityPermissions: [
      'read',
    ],
  },
];

const defaultGroups = [
  {
    _id: 'csod.group.sanity_administrators',
    _type: 'groupEntity',
    groupEntityDescription: 'Sanity Studio Administrators Group',
    groupEntityGrants: [
      {
        _key: uuidv4(),
        _type: 'reference',
        _ref: 'csod.acl.all_access_grant',
      },
    ],
    groupEntityID: 'sanity_administrators',
    groupEntityName: 'Sanity Administrators',
  },
  {
    _id: 'csod.group.sanity_editors',
    _type: 'groupEntity',
    groupEntityDescription: 'Editors Group',
    groupEntityGrants: [
      {
        _key: uuidv4(),
        _type: 'reference',
        _ref: 'csod.acl.all_read_write_access_grant',
      },
    ],
    groupEntityID: 'sanity_editors',
    groupEntityName: 'Sanity Editors',
  },
  {
    _id: 'csod.group.sanity_read_only',
    _type: 'groupEntity',
    groupEntityDescription: 'Editors Group',
    groupEntityGrants: [
      {
        _key: uuidv4(),
        _type: 'reference',
        _ref: 'csod.acl.read_only_access_grant',
      },
    ],
    groupEntityID: 'sanity_read_only',
    groupEntityName: 'Sanity Read Only',
  },
];

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: process.env.SSOSessionTokenGenerator,
  useCdn: false, // `false` if you want to ensure fresh data
});

const userId = email => `e-okta-${email.replace(/(?:(?![a-zA-Z0-9\-_]).)/g, '-')}`;

const getProject = async projectID => fetch(
  `https://api.sanity.io/v1/projects/${projectID}`,
  {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SSOSessionTokenGenerator}`,
    },
  },
).then(res => res.json());

const getUserDetails = async (projectID, userIDs) => fetch(
  `https://api.sanity.io/v1/projects/${projectID}/users/${userIDs}`,
  {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SSOSessionTokenGenerator}`,
    },
  },
).then(res => res.json());

const resetData = async (runReset) => {
  if (runReset) {
    await client.delete({
      query: "*[_type == 'groupEntity' || _type == 'grantEntity' || _type == 'userEntity']",
    });
    await client.delete({
      query: "*[_id == '_.groups.csod.group.sanity_administrators' || _id == '_.groups.csod.group.sanity_editors' || _id == '_.groups.csod.group.sanity_read_only']",
    });
  }
};

const initAcl = async (runInit) => {
  if (runInit) {
    try {
      Promise.all(
        defaultGrants.map(grant => client.createIfNotExists(grant)),
      )
        .then(() => defaultGroups.map(group => client.createIfNotExists(group)))
        .then(() => client.fetch('*[_type == \'userEntity\']'))
        .then(async (userEntities) => {
          if (_.isEmpty(userEntities)) {
            try {
              const currentProject = await getProject(sanityJson.api.projectId);
              const currentMembers = currentProject.members.filter(user => !user.isRobot);
              const userIDStrings = currentMembers.map(user => user.id).join(',');
              const sanityGroupEntities = {
                administrators: {
                  _id: 'csod.group.sanity_administrators',
                  groupEntityMembers: [],
                },
                write: {
                  _id: 'csod.group.sanity_editors',
                  groupEntityMembers: [],
                },
                read: {
                  _id: 'csod.group.sanity_read_only',
                  groupEntityMembers: [],
                },
              };
              const systemGroups = {
                administrators: {
                  _id: '_.groups.csod.group.sanity_administrators',
                  _type: 'system.group',
                  members: [],
                  grants: [
                    {
                      filter: '_id in path(\'**\')',
                      permissions: [
                        'create',
                        'read',
                        'update',
                        'manage',
                        'history',
                        'editHistory',
                      ],
                    },
                  ],
                },
                write: {
                  _id: '_.groups.csod.group.sanity_editors',
                  _type: 'system.group',
                  members: [],
                  grants: [
                    {
                      filter: '_id in path(\'**\')',
                      permissions: [
                        'create',
                        'read',
                        'update',
                        'history',
                      ],
                    },
                  ],
                },
                read: {
                  _id: '_.groups.csod.group.sanity_read_only',
                  _type: 'system.group',
                  members: [],
                  grants: [
                    {
                      filter: '_id in path(\'**\')',
                      permissions: [
                        'read',
                      ],
                    },
                  ],
                },
              };

              const transaction = client.transaction();
              transaction.reset();

              return getUserDetails(sanityJson.api.projectId, userIDStrings)
                .then(userDetails => userDetails.map((userInfo) => {
                  const member = currentMembers.filter(user => user.id === userInfo.id);
                  const entity = {
                    _id: userId(userInfo.email),
                    _type: 'userEntity',
                    userSanityID: userInfo.id,
                    userEntityEmail: userInfo.email,
                    userEntityFirstName: userInfo.givenName,
                    userEntityLastName: userInfo.familyName,
                    userEntityLocales: [
                      'us',
                      'uk',
                      'as',
                      'de',
                      'fr',
                      'it',
                    ],
                  };
                  let roleSet = false;
                  if (!_.isEmpty(member)) {
                    if (member[0].role === 'administrator') {
                      roleSet = true;
                      systemGroups.administrators.members.push(entity._id);
                      sanityGroupEntities.administrators.groupEntityMembers.push({
                        _ref: entity._id,
                        _key: uuidv4(),
                        _type: 'reference',
                      });
                    } else if (member[0].role === 'write') {
                      roleSet = true;
                      systemGroups.write.members.push(entity._id);
                      sanityGroupEntities.write.groupEntityMembers.push({
                        _ref: entity._id,
                        _key: uuidv4(),
                        _type: 'reference',
                      });
                    }
                  }
                  if (!roleSet) {
                    systemGroups.read.members.push(entity._id);
                    sanityGroupEntities.read.groupEntityMembers.push({
                      _ref: entity._id,
                      _key: uuidv4(),
                      _type: 'reference',
                    });
                  }
                  return entity;
                }))
                .then((userEntitiesList) => {
                  userEntitiesList.map(user => transaction.createIfNotExists(user));
                })
                .then(() => {
                  Object
                    .values(systemGroups)
                    .map(group => transaction.createIfNotExists(group));
                })
                .then(() => {
                  Object
                    .values(sanityGroupEntities)
                    .map(gEntity => transaction.patch(gEntity._id, {
                      set: {
                        groupEntityMembers: gEntity.groupEntityMembers,
                      },
                    }));
                })
                .then(() => transaction.commit());
            } catch (e) {
              console.error(e);
              return false;
            }
          }
          return userEntities;
        });
    } catch (e) {
      console.log(e);
    }
  }
};


resetData(false).then(() => console.log('done'));

initAcl(false).then(() => console.log('done'));


const getNewUserEntities = async () => {
  Promise.all(
    client.fetch('*[_type == \'userEntity\' && !(_id match "drafts.*okta*" || _id match "*okta*")]{_id,email}'),
  )
    .then((entities) => {
      const entityIds = entities.map(entity => entity._id);

    });

};
// get all userEntity with non-custom ID
// create custom ID entity
// map old ID to new ID
// get all groupEntities

// find non-custom ID entities in members
// replace with custom entity id
// find all permissions

//
