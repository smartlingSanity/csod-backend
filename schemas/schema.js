// First, we must import the schema creator
/* eslint-disable import/no-unresolved */
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import richDate from 'part:@sanity/form-builder/input/rich-date/schema';
/* eslint-enable import/no-unresolved */

// We import object and document schemas
import blockContent from './blockContent';
import footerMenu from './organisms/menu/footerMenu';
import globalMenu from './organisms/menu/globalMenu';
import menu from './organisms/menu/menu';

// menu
import filterMenu from './organisms/menu/filterMenu';
import groupedLinkSection from './organisms/menu/menuDrawers/menuSections/groupedLinkSection';
import iconLinkSection from './organisms/menu/menuDrawers/menuSections/iconLinkSection';
import iconLinkSubheadingSection from './organisms/menu/menuDrawers/menuSections/iconLinkSubheadingSection';
import industrySection from './organisms/menu/menuDrawers/menuSections/industrySection';
import inlineLinkItem from './organisms/menu/menuDrawers/menuSections/inlineLinkItem';
import inlineLinkSection from './organisms/menu/menuDrawers/menuSections/inlineLinkSection';
import menuQuoteSection from './organisms/menu/menuDrawers/menuSections/menuQuoteSection';
import menuSectionConfig from './organisms/menu/menuDrawers/menuSections/menuSectionConfig';
import productCategorySection from './organisms/menu/menuDrawers/menuSections/productCategorySection';
import suiteSection from './organisms/menu/menuDrawers/menuSections/suiteSection';
import suiteSectionItem from './organisms/menu/menuDrawers/menuSections/suiteSectionItem';

import groupedLinks from './molecules/groupedLinks';
import header from './organisms/header';
import headingSubheadingLink from './molecules/headingSubheadingLink';
import iconLink from './molecules/iconLink';
import iconLinkSubheading from './molecules/iconLinkSubheading';
import menuDrawer from './organisms/menu/menuDrawers/menuDrawer';

// homepage
import award from './organisms/sections/awards/award';
import awardsSection from './organisms/sections/awards/awardsSection';
import homePageBanner from './molecules/homePageBanner';
import newsBarSection from './molecules/newsBarSection';

// suitepage
import clientQuote from './molecules/clientQuote';
import gradientCard from './organisms/sections/gradientCard';
import iconTextBlock from './molecules/iconTextBlock';
import quoteLogoSlider from './organisms/sections/quoteLogoSlider';
import quoteLogoSliderV1 from './organisms/sections/quoteLogoSliderV1';

// atoms
import angledButton from './atoms/angledButton';
import animatedButton from './atoms/animatedButton';
import button from './atoms/button';
import buttonV1 from './atoms/buttonV1';
import buttonV2 from './atoms/buttonV2';
import checkBoxFormFieldReference from './atoms/formFields/referencedReusableFormFields/checkBoxFormFieldReference';
import countryFormFieldReference from './atoms/formFields/referencedReusableFormFields/countryFormFieldReference';
import csodImage from './atoms/csodImage';
import dropdownFormFieldReference from './atoms/formFields/referencedReusableFormFields/dropdownFormFieldReference';
import emailInputFormFieldReference from './atoms/formFields/referencedReusableFormFields/emailInputFormFieldReference';
import externalLink from './atoms/externalLink';
import externalLinkV1 from './atoms/externalLinkV1';
import featureIcon from './atoms/featureIcon';
import fileLink from './atoms/fileLink';
import filterItem from './atoms/filterItem';
import formBlurbReference from './atoms/formFields/formBlurbReference';
import gdprEmailFormFieldReference from './atoms/formFields/referencedReusableFormFields/gdprEmailFormFieldReference';
import link from './atoms/link';
import linkV1 from './atoms/linkV1';
import linkWithoutTitle from './atoms/linkWithoutTitle';
import listItem from './atoms/listItem';
import localeBlockContent from './atoms/localeBlockContent';
import localeCsodImage from './atoms/localeCsodImage';
import localeFile from './atoms/localeFile';
import localeString from './atoms/localeString';
import localeText from './atoms/localeText';
import localeUrl from './atoms/localeUrl';
import marketplaceText from './atoms/marketplaceText';
import sidebarText from './atoms/sidebarText';
import officeAddressReference from './atoms/officeAddressReference';
import option from './atoms/formFields/option';
import phoneNumber from './atoms/phoneNumber';
import redirect from './atoms/redirect';
import resourceGalleryText from './atoms/resourceGalleryText';
import reusableFormField from './atoms/formFields/reusableFormField';
import route from './molecules/route';
import routePrefix from './atoms/routePrefix';
import socialMedia from './atoms/socialMedia';
import sortOption from './atoms/sortOption';
import staticText from './atoms/staticText';
import textAreaFormFieldReference from './atoms/formFields/referencedReusableFormFields/textAreaFormFieldReference';
import textInputFormFieldReference from './atoms/formFields/referencedReusableFormFields/textInputFormFieldReference';
import videoButton from './atoms/videoButton';
import videoButtonV1 from './atoms/videoButtonV1';
import videoButtonV2 from './atoms/videoButtonV2';

// molecules
import biographyBlock from './molecules/biographyBlock';
import captionedIcon from './molecules/captionedIcon';
import careersSlide from './molecules/careersSlide';
import carouselCard from './organisms/sections/carouselSection/carouselCard';
import clientCarouselCard from './organisms/sections/clientCarouselSection/clientCarouselCard';
import clientCarouselCardV1 from './organisms/sections/clientCarouselSection/clientCarouselCardV1';
import clientFixedSideBar from './molecules/clientFixedSideBar';
import clientFixedSideBarV1 from './molecules/clientFixedSideBarV1';
import clientTile from './molecules/clientTile';
import clientTileV1 from './molecules/clientTileV1';
import collage from './molecules/collage';
import column from './molecules/column';
import columnText from './molecules/columnText';
import companyDescription from './molecules/companyDescription';
import downloadAsset from './molecules/downloadAsset';
import event from './molecules/event';
import filterCategory from './molecules/filterCategory';
import filterDropdown from './molecules/filterDropdown';
import footerSubscribeForm from './molecules/footerSubscribeForm';
import form from './molecules/form';
import fullImageTile from './molecules/fullImageTile';
import industryFixedSideBar from './molecules/industryFixedSideBar';
import inlineVideo from './molecules/inlineVideo';
import linkList from './molecules/linkList';
import linkTile from './molecules/linkTile';
import list from './molecules/list';
import localeNewsCoverageReference from './molecules/localeNewsCoverageReference';
import marketoEmbeddedForm from './molecules/marketoEmbeddedForm';
import officeLocationTile from './molecules/officeLocationTile';
import officeRegionSection from './molecules/officeRegionSection';
import partner from './molecules/partner';
import partnerType from './molecules/partnerType';
import partnerVertical from './molecules/partnerVertical';
import person from './molecules/person';
import personTile from './molecules/personTile';
import pressContact from './molecules/pressContact';
import partnerProductCategory from './molecules/partnerProductCategory';
import productScreenAnimation from './molecules/productScreenAnimation/productScreenAnimation';
import productScreenAnimationFile from './molecules/productScreenAnimation/productScreenAnimationFile';
import quote from './molecules/quote';
import quoteGradientCard from './molecules/quoteGradientCard';
import region from './molecules/region';
import searchBar from './molecules/searchBar';
import sectionStyles from './molecules/sectionStyles';
import shareWidget from './molecules/shareWidget';
import singleTile from './molecules/singleTile';
import socialIcon from './molecules/socialIcon';
import statTile from './molecules/statsTile/statsTile';
import statTileCard from './molecules/statsTile/statsTileCard';
import subscriptionFixedSideBar from './molecules/subscriptionFixedSidebar';
import suiteCard from './molecules/suiteCard';
import suiteCardQuote from './molecules/suiteCardQuote';
import suitePathItem from './molecules/suitePathItem';
import suiteTextBlock from './molecules/suiteTextBlock';
import tagBar from './molecules/tagBar';
import textBlock from './molecules/textBlock';
import textBlockV2 from './molecules/textBlockV2';
import textBlockContent from './molecules/textBlockContent';
import textBlockContentV1 from './molecules/textBlockContentV1';
import titleQuote from './molecules/titleQuote';
import video from './molecules/video';
import videoV1 from './molecules/videoV1';
import videoTile from './molecules/videoTile';

// sections
import allClientsSlantBanner from './organisms/sections/slantBanner/allClientsSlantBanner';
import allSmbClientsSlantBanner from './organisms/sections/slantBanner/allSmbClientsSlantBanner';
import analystReport from './organisms/analystReport';
import awardsRecognition from './organisms/awardsRecognition';
import biographyBlockSection from './organisms/sections/biographyBlockSection';
import blockContentImageQuoteSection from './organisms/sections/blockContentImageQuoteSection';
import blockContentSection from './organisms/sections/blockContentSection';
import blockContentSectionV1 from './organisms/sections/blockContentSectionV1';
import bubbleCtaReference1 from './organisms/sections/bubbleCtaSection/bubbleCtaReference1';
import bubbleCtaSection1 from './organisms/sections/bubbleCtaSection/bubbleCtaSection1';
import careersSlider from './organisms/careersSlider';
import carouselSection from './organisms/sections/carouselSection/carouselSection';
import cccTileSection from './organisms/sections/cccTileSection';
import clientCarouselSection from './organisms/sections/clientCarouselSection/clientCarouselSection';
import clientCarouselSectionV1 from './organisms/sections/clientCarouselSection/clientCarouselSectionV1';
import clientSlantBanner from './organisms/sections/slantBanner/clientSlantBanner';
import clientTileSection from './organisms/sections/clientTileSection';
import customerStatsSection from './organisms/sections/customerStatsSection';
import aiBanner from './organisms/sections/aiBanner';
import ctaCard from './molecules/ctaCard';
import ctaCardsSection from './organisms/sections/ctaCardsSection';
import formSection from './organisms/sections/formSection';
import gtmSection from './organisms/sections/gtm/gtmSection';
import gtmTextBlock from './organisms/sections/gtm/gtmTextBlock';
import headquartersCard from './organisms/headquartersCard';
import heroBanner from './organisms/sections/heroBanner';
import iconGridSection from './organisms/sections/iconGridSection';
import iconHeadingSection from './organisms/sections/iconHeadingSection';
import iconTextBlockSection from './organisms/sections/iconTextBlockSection';
import industrySlantBanner from './organisms/sections/slantBanner/industrySlantBanner';
import multiSection from './organisms/sections/multiSection';
import newsCoverage from './organisms/newsCoverage';
import officeLocationSlantBanner from './organisms/sections/slantBanner/officeLocationSlantBanner';
import oneColumnSection from './organisms/sections/oneColumnSection';
import oneColumnSectionV2 from './organisms/sections/oneColumnSectionV2';
import productSegmentSection from './organisms/sections/productSegmentSection';
import radialIconSection from './organisms/sections/radialIconSection';
import sharedTilesReference from './organisms/sections/tilesSection/sharedTilesReference';
import slantBanner from './organisms/sections/slantBanner/slantBanner';
import sliderSection from './organisms/sections/sliderSection';
import smbSlantBanner from './organisms/sections/slantBanner/smbSlantBanner';
import smbSuiteBannerSection from './organisms/sections/smbSuiteBannerSection';
import statsCounter from './organisms/sections/statsCounter/statsCounter';
import statsCounterSection from './organisms/sections/statsCounter/statsCounterSection';
import subscriptionSlantBanner from './organisms/sections/slantBanner/subscriptionSlantBanner';
import suiteBannerSection from './organisms/sections/suiteBannerSection';
import suiteBenefitsBanner from './organisms/sections/suiteBenefitsBanner';
import suiteCards from './organisms/sections/suiteCards';
import suiteIconGridSection from './organisms/sections/suiteIconGridSection';
import suitePathSection from './organisms/sections/suitePathSection';
import textBlockWithIconRowSection from './organisms/sections/textBlockWithIconRowSection';
import threeCardSection from './organisms/sections/threeCardSection';
import tilesSection from './organisms/sections/tilesSection/tilesSection';
import timelineItem from './organisms/sections/timelineSection/timelineItem';
import timelineItemsByYear from './organisms/sections/timelineSection/timelineItemsByYear';
import timelineSection from './organisms/sections/timelineSection/timelineSection';
import twoColumnSection from './organisms/sections/twoColumnSection';
import twoColumnSectionV2 from './organisms/sections/twoColumnSectionV2/twoColumnSectionV2';
import twoColumnTextSection from './organisms/sections/twoColumnTextSection';

// pages
import aiPage from './templates/aiPage';
import allCareersPage from './templates/allCareersPage';
import allClientsPage from './templates/allClientsPage';
import allResourcesPage from './templates/allResourcesPage';
import allSmbClientsPage from './templates/allSmbClientsPage';
import boardOfDirectorsPage from './templates/boardOfDirectorsPage';
import cccPage from './templates/cccPage';
import clientPage from './templates/clientPage';
import courseCatalogData from './data/courseContentCatalog/allCoursesData';
import eventsPage from './templates/eventsPage';
import executivePage from './templates/executivePage';
import formPage from './templates/formPage';
import foundersPage from './templates/foundersPage';
import glossaryPage from './templates/glossaryPage';
import glossaryTermPage from './templates/glossaryTermPage';
import gtmPage from './templates/gtmPage';
import homePage from './templates/homePage';
import industryPage from './templates/industryPage';
import industryRecognitionPage from './templates/industryRecognitionPage';
import marketplacePage from './templates/marketplacePage';
import newsCoveragesPage from './templates/newsCoveragesPage';
import newsRoomPage from './templates/newsRoomPage';
import officeLocationsPage from './templates/officeLocationsPage';
import page from './templates/page';
import partnerDetailPage from './templates/partnerDetailPage';
import pressReleasePage from './templates/pressReleasePage';
import productPage from './templates/productPage';
import productCategoryPage from './templates/productCategoryPage';
import resourceDetailPage from './templates/resourceDetailPage';
import searchPage from './templates/searchPage';
import smbPage from './templates/smbPage';
import smbProductPage from './templates/smbProductPage';
import subscriptionPage from './templates/subscriptionPage';
import suiteBenefitsPage from './templates/suiteBenefitsPage';
import suitePage from './templates/suitePage';
import thankYouPage from './templates/thankYouPage';

// Entites
import productCategoryEntity from './entities/productEntity/productCategoryEntity';
import productEntity from './entities/productEntity/productEntity';
import clientEntity from './entities/clientEntity/clientEntity';
import industryEntity from './entities/industryEntity/industryEntity';
import grantEntity from './entities/aclEntities/grantEntity/grantEntity';
import groupEntity from './entities/aclEntities/groupEntity/groupEntity';
import quoteEntity from './entities/quoteEntity/quoteEntity';
import userEntity from './entities/aclEntities/userEntity/userEntity';

// site settings
import siteSettings from './siteSettings';

// sectionBackgrounds
import {
  customBackground,
  grayBox,
  grayBoxBottomSlant,
  grayBoxDoubleSlant,
  grayBoxTopSlant,
  grayCurves,
} from './organisms/sectionBackgrounds/regularBackgrounds';
import customBackgroundStyles from './organisms/sectionBackgrounds/regularBackgrounds/customBackground/customBackgroundStyles';

// bannerBackgrounds
import { suiteBannerBackground } from './organisms/sectionBackgrounds/bannerBackgrounds';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    footerMenu,
    globalMenu,
    menu,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    filterMenu,
    groupedLinkSection,
    iconLinkSection,
    iconLinkSubheadingSection,
    industrySection,
    inlineLinkSection,
    menuDrawer,
    menuQuoteSection,
    menuSectionConfig,
    productCategorySection,
    suiteSection,
    groupedLinks,
    header,
    headingSubheadingLink,
    iconLink,
    iconLinkSubheading,
    inlineLinkItem,
    link,
    linkV1,
    linkWithoutTitle,
    suiteSectionItem,

    // form and form fields
    checkBoxFormFieldReference,
    countryFormFieldReference,
    dropdownFormFieldReference,
    emailInputFormFieldReference,
    footerSubscribeForm,
    form,
    formBlurbReference,
    formSection,
    gdprEmailFormFieldReference,
    marketoEmbeddedForm,
    option,
    reusableFormField,
    textAreaFormFieldReference,
    textInputFormFieldReference,

    // homepage content types
    award,
    awardsSection, // localized
    homePageBanner,
    newsBarSection,
    suiteCards, // localized

    // suite pages
    clientQuote, // localized
    gradientCard, // localized
    iconTextBlock, // localized
    quoteLogoSlider, // localized
    quoteLogoSliderV1,

    // industry recognition page
    timelineItem,
    timelineItemsByYear,
    timelineSection,

    // office locations page
    headquartersCard,
    officeAddressReference,
    officeLocationSlantBanner,
    officeLocationTile,
    officeRegionSection,

    // careers page
    careersSlide,
    careersSlider,
    featureIcon,
    searchBar,
    titleQuote,

    // atoms used everywhere
    angledButton,
    animatedButton,
    button,
    buttonV1,
    buttonV2,
    csodImage,
    externalLink,
    externalLinkV1,
    fileLink,
    filterItem,
    listItem,
    localeBlockContent,
    localeCsodImage,
    localeFile,
    localeString,
    localeText,
    localeUrl,
    marketplaceText,
    phoneNumber,
    redirect,
    resourceGalleryText,
    routePrefix,
    socialMedia,
    sidebarText,
    sortOption,
    staticText,
    videoButton,
    videoButtonV1,
    videoButtonV2,

    // molecules used everywhere
    biographyBlock, // localized
    captionedIcon,
    carouselCard,
    clientCarouselCard, // localized
    clientCarouselCardV1,
    clientFixedSideBar, // localized
    clientFixedSideBarV1,
    clientTile,
    clientTileV1,
    collage,
    column,
    columnText,
    companyDescription,
    ctaCard, // localized
    downloadAsset,
    event,
    filterCategory,
    filterDropdown,
    fullImageTile,
    industryFixedSideBar,
    inlineVideo,
    linkList,
    linkTile,
    list,
    localeNewsCoverageReference,
    partner,
    partnerType,
    partnerVertical,
    person,
    personTile,
    pressContact,
    partnerProductCategory,
    productScreenAnimation,
    productScreenAnimationFile,
    quote,
    quoteGradientCard, // localized
    region,
    route, // localized
    sectionStyles,
    shareWidget,
    singleTile,
    socialIcon,
    statTile,
    statTileCard,
    subscriptionFixedSideBar, // localized
    suiteCard,
    suiteCardQuote,
    suitePathItem,
    suiteTextBlock,
    tagBar,
    textBlock,
    textBlockV2,
    textBlockContent,
    textBlockContentV1,
    video,
    videoV1,
    videoTile,

    // sections used everywhere
    aiBanner,
    allClientsSlantBanner,
    allSmbClientsSlantBanner,
    analystReport,
    awardsRecognition,
    biographyBlockSection, // localized
    blockContentImageQuoteSection,
    blockContentSection, // localized
    blockContentSectionV1, // localized
    bubbleCtaReference1, // localized
    bubbleCtaSection1,
    carouselSection, // localized
    cccTileSection,
    clientCarouselSection, // localized
    clientCarouselSectionV1,
    clientSlantBanner,
    clientTileSection,
    customerStatsSection,
    ctaCardsSection,
    gtmSection,
    gtmTextBlock, // localized
    heroBanner,
    iconGridSection, // localized
    iconHeadingSection, // localized
    iconTextBlockSection, // localized
    industrySlantBanner,
    multiSection, // localized
    newsCoverage,
    oneColumnSection, // localized
    oneColumnSectionV2,
    productSegmentSection,
    radialIconSection, // localized
    sharedTilesReference,
    slantBanner,
    sliderSection,
    smbSlantBanner,
    smbSuiteBannerSection,
    statsCounter,
    statsCounterSection, // localized
    subscriptionSlantBanner, // localized
    suiteBannerSection, // localized
    suiteBenefitsBanner, // localized
    suiteIconGridSection,
    suitePathSection,
    textBlockWithIconRowSection,
    threeCardSection, // localized
    tilesSection,
    twoColumnSection, // localized
    twoColumnSectionV2,
    twoColumnTextSection, // localized

    // page templates
    aiPage,
    allCareersPage, // US only?  ---------- verify
    allClientsPage, // localized
    allResourcesPage, // localized
    allSmbClientsPage,
    boardOfDirectorsPage, // localized
    cccPage, // localized
    clientPage, // localized
    courseCatalogData, // NA
    eventsPage, // localized
    executivePage, // localized
    formPage, // localized
    foundersPage, // localized
    glossaryPage, // localized
    glossaryTermPage, // localized
    gtmPage, // localized
    homePage, // localized
    industryPage, // localized
    industryRecognitionPage, // localized
    marketplacePage, // localized
    newsCoveragesPage, // localized
    newsRoomPage, // localized
    officeLocationsPage, // localized
    page, // localized
    partnerDetailPage, // localized
    pressReleasePage, // localized
    productCategoryPage, // localized
    productPage, // localized
    resourceDetailPage, // localized
    searchPage, // localized
    smbPage, // wip - lina
    smbProductPage, // wip - lina
    subscriptionPage, // localized
    suiteBenefitsPage, // localized
    suitePage, // localized
    thankYouPage, // localized

    // sanity studio types
    richDate,
    // entities
    clientEntity,
    industryEntity,
    productEntity, // localized
    productCategoryEntity, // localized
    grantEntity,
    groupEntity,
    quoteEntity,
    userEntity,


    // siteSettings
    siteSettings,

    // sectionBackgrounds
    customBackground,
    customBackgroundStyles,
    grayBox,
    grayBoxBottomSlant,
    grayBoxDoubleSlant,
    grayBoxTopSlant,
    grayCurves,

    // bannerBackgrounds
    suiteBannerBackground,
  ]),
});
