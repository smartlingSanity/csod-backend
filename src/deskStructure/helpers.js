/* eslint-disable import/no-unresolved */
import S from '@sanity/desk-tool/structure-builder';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import userStore from 'part:@sanity/base/user';
import client from 'part:@sanity/base/client';
import _ from 'lodash/fp';

// Web preview
import WebPreview from '../components/previews/WebPreview';

export const getUser = () => {
  let custom = false;
  let userId;

  const next = ({ user }) => {
    custom = user.role === 'custom';
    userId = user.id;
  };

  userStore.currentUser.subscribe({
    next,
    error: error => console.error(`Failed to get current user:${error}`),
  });

  return { custom, userId };
};

export const getAvailableDocumentTypes = async (userId) => {
  const query = `*['${userId}' in members]`;
  const documentsArray = [];

  await client.fetch(query).then((accessControlDocuments) => {
    accessControlDocuments.forEach((accessControlDocument) => {
      accessControlDocument.grants.forEach((grant) => {
        // match for anything within the single quotes
        // ie grants : "_type == 'event'" will match event
        const matchBetweenSingleQuotes = /'(.*?)'/g;
        const documentType = grant.filter
          .match(matchBetweenSingleQuotes)
          .join()
          .replace(/'/g, '');
        if (!documentsArray.includes(documentType)) {
          documentsArray.push(documentType);
        }
      });
    });
  });

  return documentsArray;
};

// Web preview configuration

const getListItem = _.curry((getViews, schemaType, title) => S.listItem(schemaType)
  .title(title)
  .schemaType(schemaType)
  .child(
    S.documentTypeList(schemaType)
      .title(title)
      .child(documentId => S.document()
        .documentId(documentId)
        .schemaType(schemaType)
        .views(getViews(schemaType, title)))
      .canHandleIntent((_name, params) => params.type === schemaType),
  ));

export const getWebPreviewListItem = getListItem(() => [
  S.view.form().icon(EditIcon),
  S.view.component(WebPreview).icon(EyeIcon).title('Web Preview'),
]);

// customized desk structure
export const getCustomizedDeskStructure = allowedDocumentTypes => allowedDocumentTypes
  .map((allowedDocumentType) => {
    if (allowedDocumentType === 'route') {
      return S.documentTypeListItem('route').title('Route');
    }
    if (allowedDocumentType === 'event') {
      return S.documentTypeListItem('event').title('Event');
    }
    if (allowedDocumentType === 'eventsPage') {
      return getWebPreviewListItem('eventsPage', 'Events and Webinars Page');
    }
    if (allowedDocumentType === 'marketplacePage') {
      return getWebPreviewListItem(
        'marketplacePage',
        'Partner Ecosystem Landing',
      );
    }
    if (allowedDocumentType === 'partnerDetailPage') {
      return getWebPreviewListItem('partnerDetailPage', 'Partner Detail');
    }
    if (allowedDocumentType === 'newsRoomPage') {
      return getWebPreviewListItem('newsRoomPage', 'Newsroom Landing');
    }
    if (allowedDocumentType === 'newsCoverage') {
      return S.documentTypeListItem('newsCoverage').title('Article');
    }
    if (allowedDocumentType === 'newsCoveragesPage') {
      return S.documentTypeListItem('newsCoveragesPage').title(
        'All Articles Page',
      );
    }
    if (allowedDocumentType === 'pressReleasePage') {
      return getWebPreviewListItem('pressReleasePage', 'Press Release');
    }
    if (allowedDocumentType === 'allResourcesPage') {
      return getWebPreviewListItem('allResourcesPage', 'Resource Gallery');
    }
    if (allowedDocumentType === 'resourceDetailPage') {
      return getWebPreviewListItem(
        'resourceDetailPage',
        'Resource Detail Page',
      );
    }
    if (allowedDocumentType === 'smbPage') {
      return getWebPreviewListItem('smbPage', 'SMB Page');
    }
    if (allowedDocumentType === 'thankYouPage') {
      return getWebPreviewListItem('thankYouPage', 'Thank You');
    }
  })
  .filter(notUndefined => notUndefined !== undefined);

// default desk structure
export const getDefaultDeskStructure = hiddenDocTypes => S.list()
  .title('Cornerstone Ondemand')
  .items([
    S.listItem()
      .title('Menus')
      .child(
        S.list()
          .title('Menus')
          .id('menu')
          .items([
            S.documentTypeListItem('footerMenu').title('Footer Menu'),
            S.documentTypeListItem('globalMenu').title('Global Menu'),
            S.documentTypeListItem('menu').title('Main Menu'),
            S.listItem()
              .title('Filter Menu')
              .child(
                S.list()
                  .title('Filter Menu')
                  .items([
                    S.documentTypeListItem('filterMenu').title('Filter Menu'),
                    S.documentTypeListItem('filterDropdown').title(
                      'Filter Dropdown',
                    ),
                    S.documentTypeListItem('filterCategory').title(
                      'Filter Category',
                    ),
                    S.documentTypeListItem('filterItem').title('Filter Item'),
                    S.documentTypeListItem('sortOption').title('Sort Option'),
                  ]),
              ),
          ]),
      ),
    S.listItem()
      .title('Pages')
      .child(
        S.list()
          .title('Pages')
          .id('pages')
          .items([
            getWebPreviewListItem(
              'aiPage',
              'AI Page',
            ),
            getWebPreviewListItem(
              'boardOfDirectorsPage',
              'Board of Directors',
            ),
            S.listItem()
              .title('Customer')
              .child(
                S.list()
                  .title('Customer')
                  .id('allclientspage')
                  .items([
                    getWebPreviewListItem('allclientspage', 'All Customers'),
                    getWebPreviewListItem('allSmbClientsPage', 'All SMB Customers'),
                    getWebPreviewListItem('clientPage', 'Customer Detail'),
                    S.listItem()
                      .title('Settings')
                      .child(
                        S.list()
                          .title('Settings')
                          .id('clientPageSettings')
                          .items([
                            S.documentTypeListItem('sidebarText').title('Customer Text'),
                          ]),
                      ),
                  ]),
              ),
            S.listItem()
              .title('Content Anytime')
              .child(
                S.list()
                  .title('Content Anytime')
                  .id('contentanytime')
                  .items([
                    getWebPreviewListItem(
                      'cccPage',
                      'Content Course Catalog',
                    ),
                    getWebPreviewListItem(
                      'subscriptionPage',
                      'Content Subscription',
                    ),
                    S.documentTypeListItem('course').title('Courses'),
                  ]),
              ),
            S.listItem()
              .title('Events and Webinars')
              .child(
                S.list()
                  .title('Events and Webinars')
                  .id('eventsPage')
                  .items([
                    getWebPreviewListItem(
                      'eventsPage',
                      'Events and Webinars Page',
                    ),
                    S.documentTypeListItem('event').title('Event'),
                  ]),
              ),
            S.listItem()
              .title('Forms')
              .child(
                S.list()
                  .title('Forms')
                  .id('forms')
                  .items([
                    S.documentTypeListItem('formBlurbReference').title(
                      'Form Blurbs',
                    ),
                    S.listItem()
                      .title('Form Fields')
                      .child(
                        S.list()
                          .title('Form Fields')
                          .id('formFields')
                          .items([
                            S.documentTypeListItem(
                              'countryFormFieldReference',
                            ).title('Country Form Field Reference'),
                            S.documentTypeListItem(
                              'dropdownFormFieldReference',
                            ).title('Dropdown Form Field Reference'),
                            S.documentTypeListItem(
                              'emailInputFormFieldReference',
                            ).title('Email Input Form Field Reference'),
                            S.documentTypeListItem(
                              'textInputFormFieldReference',
                            ).title('Text Input Form Field Reference'),
                            S.documentTypeListItem(
                              'textAreaFormFieldReference',
                            ).title('Text Area Form Field Reference'),
                            S.documentTypeListItem(
                              'checkBoxFormFieldReference',
                            ).title('Check Box Form Field Reference'),
                          ]),
                      ),
                    getWebPreviewListItem('formPage', 'Form Page'),
                  ]),
              ),
            getWebPreviewListItem('executivePage', 'Executive Page'),
            getWebPreviewListItem('foundersPage', 'Founders'),
            getWebPreviewListItem('page', 'Generic Page'),
            getWebPreviewListItem('smbPage', 'SMB Page'),
            S.listItem()
              .title('Glossary')
              .child(
                S.list()
                  .title('Glossary')
                  .id('glossary')
                  .items([
                    S.documentTypeListItem('glossaryPage').title('All Terms'),
                    S.documentTypeListItem('glossaryTermPage').title(
                      'Term Detail',
                    ),
                  ]),
              ),
            getWebPreviewListItem('gtmPage', 'Go To Market (GTM)'),
            S.listItem()
              .title('Home')
              .child(
                S.list()
                  .title('Home')
                  .id('home')
                  .items([
                    getWebPreviewListItem('homepage', 'Home'),
                    S.documentTypeListItem('newsBarSection').title(
                      'News Bar Items',
                    ),
                  ]),
              ),
            getWebPreviewListItem('industrypage', 'Industry'),
            getWebPreviewListItem(
              'industryRecognitionPage',
              'Industry Recognition',
            ),
            S.listItem()
              .title('Partner Ecosystem')
              .child(
                S.list()
                  .title('Partner Ecosystem')
                  .id('marketplace')
                  .items([
                    getWebPreviewListItem(
                      'marketplacePage',
                      'Partner Ecosystem Landing',
                    ),
                    S.documentTypeListItem('marketplaceText').title(
                      'Partner Ecosystem Text',
                    ),
                    getWebPreviewListItem(
                      'partnerDetailPage',
                      'Partner Detail',
                    ),
                    S.documentTypeListItem('partnerType').title(
                      'Partner Type',
                    ),
                    S.documentTypeListItem('partnerVertical').title(
                      'Partner Vertical',
                    ),
                    S.documentTypeListItem('partner').title('Partner Tile'),
                  ]),
              ),
            S.listItem()
              .title('Newsroom')
              .child(
                S.list()
                  .title('Newsroom')
                  .id('newsroom')
                  .items([
                    getWebPreviewListItem('newsRoomPage', 'Newsroom Landing'),
                    S.documentTypeListItem('newsCoverage').title('Article'),
                    S.documentTypeListItem('newsCoveragesPage').title(
                      'All Articles Page',
                    ),
                    getWebPreviewListItem(
                      'pressReleasePage',
                      'Press Release',
                    ),
                  ]),
              ),
            S.listItem()
              .title('Resource Corner')
              .child(
                S.list()
                  .title('Resource Corner')
                  .id('resourceCorner')
                  .items([
                    getWebPreviewListItem(
                      'allResourcesPage',
                      'All Resources Page',
                    ),
                    getWebPreviewListItem(
                      'resourceDetailPage',
                      'Resource Detail Page',
                    ),
                    S.documentTypeListItem('resourceGalleryText').title(
                      'Resource Corner Text',
                    ),
                    S.listItem()
                      .title('Filter Menu')
                      .child(
                        S.documentList()
                          .title('Filter Menu')
                          .menuItems(
                            S.documentTypeList('filterMenu').getMenuItems(),
                          )
                          .filter('_type == $type && name == $name')
                          .params({
                            type: 'filterMenu',
                            name: 'Resource Gallery',
                          }),
                      ),
                  ]),
              ),
            S.listItem()
              .title('Careers')
              .child(
                S.list()
                  .title('Careers')
                  .id('careers')
                  .items([
                    getWebPreviewListItem(
                      'allCareersPage',
                      'All Careers Page',
                    ),
                    S.documentTypeListItem('searchBar').title('Search Bar'),
                  ]),
              ),
            S.listItem()
              .title('Office Locations')
              .child(
                S.list()
                  .title('Office Locations')
                  .id('officeLocationsPage')
                  .items([
                    getWebPreviewListItem(
                      'officeLocationsPage',
                      'Office Locations',
                    ),
                    S.documentTypeListItem('officeAddressReference').title(
                      'Office Addresses',
                    ),
                  ]),
              ),
            S.listItem()
              .title('Search')
              .child(
                S.list()
                  .title('Search')
                  .id('search')
                  .items([
                    S.documentTypeListItem('searchpage').title(
                      'Search Results',
                    ),
                    S.documentTypeListItem('staticText').title('Search Text'),
                  ]),
              ),
            S.listItem()
              .title('Products')
              .child(
                S.list()
                  .title('Products')
                  .id('suitepage')
                  .items([
                    getWebPreviewListItem(
                      'suitebenefitspage',
                      'Product Benefits',
                    ),
                    getWebPreviewListItem('suitepage', 'Product Overview'),
                    getWebPreviewListItem('smbProductPage', 'SMB Product Page'),
                  ]),
              ),
            getWebPreviewListItem('thankYouPage', 'Thank You'),
          ]),
      ),
    S.listItem()
      .title('References')
      .child(
        S.list()
          .title('References')
          .id('references')
          .items([
            S.documentTypeListItem('bubbleCtaReference1').title('Bubble CTA'),
            S.documentTypeListItem('companyDescription').title(
              'Company Description',
            ),
            S.documentTypeListItem('customBackground').title(
              'Custom Background',
            ),
            S.documentTypeListItem('person').title('Person'),
            S.documentTypeListItem('pressContact').title('Press Contacts'),
            S.documentTypeListItem('partnerProductCategory').title(
              'Partner Ecosystem Product Category',
            ),
            S.documentTypeListItem('region').title('Region'),
            S.documentTypeListItem('route').title('Route'),
            S.documentTypeListItem('shareWidget').title('Share Widget'),
            S.documentTypeListItem('socialMedia').title('Social Media'),
            S.documentTypeListItem('sharedTilesReference').title(
              'Tiles Section',
            ),
          ]),
      ),
    S.listItem()
      .title('Site Settings')
      .child(
        S.list()
          .title('Site Settings')
          .id('siteSettings')
          .items([
            S.documentTypeListItem('redirect').title('Redirects'),
            S.documentTypeListItem('siteSettings').title('GDPR Banner'),
            S.documentTypeListItem('routePrefix').title('Page URL Prefix'),
          ]),
      ),
    S.listItem()
      .title('Entities')
      .child(
        S.list()
          .title('Entities')
          .id('entities')
          .items([
            S.documentTypeListItem('productEntity').title('Product Entities'),
            S.documentTypeListItem('productCategoryEntity').title('Product Category Entities'),
            S.documentTypeListItem('clientEntity').title('Client Entities'),
            S.documentTypeListItem('industryEntity').title('Industry Entities'),
            S.documentTypeListItem('quoteEntity').title('Quote Entities'),
          ]),
      ),
    S.listItem()
      .title('Users')
      .child(
        S.list()
          .title('Users')
          .id('users')
          .items([
            S.documentTypeListItem('userEntity').title('Users'),
            S.documentTypeListItem('groupEntity').title('Groups'),
            S.documentTypeListItem('grantEntity').title('Permissions'),
          ]),
      ),
    ...S.documentTypeListItems().filter(hiddenDocTypes),
  ]);

export const buildDeskStructure = async (hiddenDocTypes) => {
  // grab user id and if custom user or not
  const { custom, userId } = getUser();

  // if not custom show default desk
  if (!custom) return getDefaultDeskStructure(hiddenDocTypes);

  // not an admin? grab what document types they can see
  const documentsArray = custom ? await getAvailableDocumentTypes(userId) : [];

  // create customized desk structure
  const listItems = getCustomizedDeskStructure(documentsArray);

  return S.list()
    .title('Cornerstone Ondemand')
    .items([...listItems, ...S.documentTypeListItems().filter(hiddenDocTypes)]);
};

export default {
  buildDeskStructure,
};
