const formPage = {
  _createdAt: '2020-02-04T02:09:41Z',
  _id: '76187e56-243b-4ba5-a7b7-6676f5a020ac',
  _rev: '1haU2alT69LyvNrGKx4o8g',
  _type: 'formPage',
  _updatedAt: '2020-10-28T21:20:58Z',
  heroBanner: {
    _type: 'heroBanner',
    heroImage: {
      _type: 'csodImage',
      asset: {
        _ref: 'image-b5272f547411c551d8121bc84b7952b40c6453ee-1000x324-png',
        _type: 'reference',
      },
    },
    textBlock: {
      _type: 'textBlock',
      align: 'center',
      descriptionColor: 'gray',
      headingText: 'Contact us today',
      headingTextColor: 'darkGray',
    },
  },
  route: {
    _ref: '3lTUM1jwZkjcUPpsQsxLxP',
    _type: 'reference',
  },
  sections: [
    {
      _key: 'b9b512302e1c',
      _type: 'formSection',
      description: [
        {
          _key: 'a6fa15fe3552',
          _type: 'block',
          children: [
            {
              _key: 'a6fa15fe35520',
              _type: 'span',
              marks: [],
              text: 'Cornerstone has solutions to help you:',
            },
          ],
          markDefs: [],
          style: 'h3',
        },
        {
          _key: '438836905d82',
          _type: 'block',
          children: [
            {
              _key: '438836905d820',
              _type: 'span',
              marks: [],
              text: 'Recruit the right people',
            },
          ],
          level: 1,
          listItem: 'bullet',
          markDefs: [],
          style: 'normal',
        },
        {
          _key: '5e0d481645f4',
          _type: 'block',
          children: [
            {
              _key: '5e0d481645f40',
              _type: 'span',
              marks: [],
              text: 'Train and develop your teams',
            },
          ],
          level: 1,
          listItem: 'bullet',
          markDefs: [],
          style: 'normal',
        },
        {
          _key: '0e173afbbf14',
          _type: 'block',
          children: [
            {
              _key: '0e173afbbf140',
              _type: 'span',
              marks: [],
              text: 'Manage your human capital',
            },
          ],
          level: 1,
          listItem: 'bullet',
          markDefs: [],
          style: 'normal',
        },
      ],
      form: [
        {
          _key: '088489b6-3cb3-442b-809b-004d35c09931',
          _type: 'form',
          action: {
            _ref: '1eaf32b2-ba33-41c7-b5d2-2655877bac0d',
            _type: 'reference',
          },
          formFields: [
            {
              _key: '6c9ac66f7707',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: 'b3c8aa12-299d-45bf-bce5-5122cf953557',
                _type: 'reference',
              },
            },
            {
              _key: 'af52460e51c0',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '6c259f4e-78d0-4153-925c-48b20c49b3bb',
                _type: 'reference',
              },
            },
            {
              _key: '017ba5501cc2',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '1f20d122-2169-4336-a0b7-938c23402d3a',
                _type: 'reference',
              },
            },
            {
              _key: '5176090fb9dc',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '00b07aff-c2c4-463e-8549-a9bf8a3dce87',
                _type: 'reference',
              },
            },
            {
              _key: 'ccfac6497ba9',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: 'fb652e5a-83c4-49aa-9aed-dffb6e2a5a9c',
                _type: 'reference',
              },
            },
            {
              _key: '5f66a4e13e1c',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: 'a49cb870-6510-4083-83a9-d9c3d11b0f2e',
                _type: 'reference',
              },
            },
            {
              _key: '3b653886cbb5',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '6880cff5-9783-4e7d-ba97-54c662be7c17',
                _type: 'reference',
              },
            },
            {
              _key: 'e3dbef4d928d',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '80d6d2fa-f7fa-42f3-99ba-bbea68043ebd',
                _type: 'reference',
              },
            },
          ],
          formType: 'contactUs',
          name: 'Contact Us General',
          submitButton: {
            _type: 'button',
            color: 'accent',
            text: 'Contact Us',
          },
        },
      ],
      formPosition: 'left',
    },
  ],
  title: 'Contact Us',
};

const localizedFormPage = {
  _createdAt: '2020-02-04T02:09:41Z',
  _id: '76187e56-243b-4ba5-a7b7-6676f5a020ac',
  _rev: '1haU2alT69LyvNrGKx4o8g',
  _type: 'formPage',
  _updatedAt: '2020-10-28T21:20:58Z',
  heroBanner: {
    _type: 'heroBanner',
    heroImage: {
      _type: 'localeCsodImage',
      us: {
        _type: 'csodImage',
        asset: {
          _ref: 'image-b5272f547411c551d8121bc84b7952b40c6453ee-1000x324-png',
          _type: 'reference',
        },
      },
      ap: {
        _type: 'csodImage',
        asset: {
          _ref: 'image-b5272f547411c551d8121bc84b7952b40c6453ee-1000x324-png',
          _type: 'reference',
        },
      },
    },
    textBlock: {
      _type: 'textBlock',
      align: 'center',
      descriptionColor: 'gray',
      headingText: {
        _type: 'localeString',
        us: 'Contact us today',
        ap: 'Contact us today',
      },
      headingTextColor: 'darkGray',
    },
  },
  route: {
    _ref: '3lTUM1jwZkjcUPpsQsxLxP',
    _type: 'reference',
  },
  sections: [
    {
      _key: 'b9b512302e1c',
      _type: 'formSection',
      description: {
        _type: 'localeBlockContent',
        us: [
          {
            _key: 'a6fa15fe3552',
            _type: 'block',
            children: [
              {
                _key: 'a6fa15fe35520',
                _type: 'span',
                marks: [],
                text: 'Cornerstone has solutions to help you:',
              },
            ],
            markDefs: [],
            style: 'h3',
          },
          {
            _key: '438836905d82',
            _type: 'block',
            children: [
              {
                _key: '438836905d820',
                _type: 'span',
                marks: [],
                text: 'Recruit the right people',
              },
            ],
            level: 1,
            listItem: 'bullet',
            markDefs: [],
            style: 'normal',
          },
          {
            _key: '5e0d481645f4',
            _type: 'block',
            children: [
              {
                _key: '5e0d481645f40',
                _type: 'span',
                marks: [],
                text: 'Train and develop your teams',
              },
            ],
            level: 1,
            listItem: 'bullet',
            markDefs: [],
            style: 'normal',
          },
          {
            _key: '0e173afbbf14',
            _type: 'block',
            children: [
              {
                _key: '0e173afbbf140',
                _type: 'span',
                marks: [],
                text: 'Manage your human capital',
              },
            ],
            level: 1,
            listItem: 'bullet',
            markDefs: [],
            style: 'normal',
          },
        ],
        ap: [
          {
            _key: 'a6fa15fe3552',
            _type: 'block',
            children: [
              {
                _key: 'a6fa15fe35520',
                _type: 'span',
                marks: [],
                text: 'Cornerstone has solutions to help you:',
              },
            ],
            markDefs: [],
            style: 'h3',
          },
          {
            _key: '438836905d82',
            _type: 'block',
            children: [
              {
                _key: '438836905d820',
                _type: 'span',
                marks: [],
                text: 'Recruit the right people',
              },
            ],
            level: 1,
            listItem: 'bullet',
            markDefs: [],
            style: 'normal',
          },
          {
            _key: '5e0d481645f4',
            _type: 'block',
            children: [
              {
                _key: '5e0d481645f40',
                _type: 'span',
                marks: [],
                text: 'Train and develop your teams',
              },
            ],
            level: 1,
            listItem: 'bullet',
            markDefs: [],
            style: 'normal',
          },
          {
            _key: '0e173afbbf14',
            _type: 'block',
            children: [
              {
                _key: '0e173afbbf140',
                _type: 'span',
                marks: [],
                text: 'Manage your human capital',
              },
            ],
            level: 1,
            listItem: 'bullet',
            markDefs: [],
            style: 'normal',
          },
        ],
      },
      form: [
        {
          _key: '088489b6-3cb3-442b-809b-004d35c09931',
          _type: 'form',
          action: {
            _ref: '1eaf32b2-ba33-41c7-b5d2-2655877bac0d',
            _type: 'reference',
          },
          formFields: [
            {
              _key: '6c9ac66f7707',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: 'b3c8aa12-299d-45bf-bce5-5122cf953557',
                _type: 'reference',
              },
            },
            {
              _key: 'af52460e51c0',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '6c259f4e-78d0-4153-925c-48b20c49b3bb',
                _type: 'reference',
              },
            },
            {
              _key: '017ba5501cc2',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '1f20d122-2169-4336-a0b7-938c23402d3a',
                _type: 'reference',
              },
            },
            {
              _key: '5176090fb9dc',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '00b07aff-c2c4-463e-8549-a9bf8a3dce87',
                _type: 'reference',
              },
            },
            {
              _key: 'ccfac6497ba9',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: 'fb652e5a-83c4-49aa-9aed-dffb6e2a5a9c',
                _type: 'reference',
              },
            },
            {
              _key: '5f66a4e13e1c',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: 'a49cb870-6510-4083-83a9-d9c3d11b0f2e',
                _type: 'reference',
              },
            },
            {
              _key: '3b653886cbb5',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '6880cff5-9783-4e7d-ba97-54c662be7c17',
                _type: 'reference',
              },
            },
            {
              _key: 'e3dbef4d928d',
              _type: 'reusableFormField',
              formFieldReference: {
                _ref: '80d6d2fa-f7fa-42f3-99ba-bbea68043ebd',
                _type: 'reference',
              },
            },
          ],
          formType: 'contactUs',
          name: 'Contact Us General',
          submitButton: {
            _type: 'button',
            color: 'accent',
            text: {
              _type: 'localeString',
              us: 'Contact Us',
              ap: 'Contact Us',
            },
          },
        },
      ],
      formPosition: 'left',
    },
  ],
  title: {
    _type: 'localeString',
    us: 'Contact Us',
    ap: 'Contact Us',
  },
};

module.exports = {
  formPage,
  localizedFormPage,
};
