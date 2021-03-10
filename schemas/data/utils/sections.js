/* eslint-disable import/no-extraneous-dependencies */
const sanityClient = require('@sanity/client');
const _ = require('lodash/fp');
const uuidv4 = require('uuid/v4');
const sanityJson = require('../../../sanity');
const sanityToken = require('./importCsvToken').default;
const { htmlToPortableText } = require('./blockContent');
const { getEmbedCodeForUrl } = require('./video');

const queue = require('./asyncQueue').default;

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  token: sanityToken,
});
const { getFirstTextThatMatches } = require('./html');

const { createSanityAssetFromUrl } = require('./assets');

module.exports = function sectionsHtmlParser(partner) {
  /* Converts cta buttons html to sanity objects */
  const getButtonCta = async ($html) => {
    try {
      const ctaButtons = await Promise.all(
        $html('.button_cta')
          .map(async (index, element) => {
            try {
              const buttonCta = $html(element).find('a');
              const url = buttonCta.attr('href');
              const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
              if (urlRegex.test(url)) {
                return {
                  _key: uuidv4(),
                  _type: 'button',
                  color: 'primary',
                  text: buttonCta.text(),
                  link: {
                    _type: 'link',
                    link: [
                      {
                        _type: 'externalLink',
                        _key: uuidv4(),
                        externalLink: url,
                      },
                    ],
                    title: buttonCta.text(),
                  },
                };
              }
              if (url === '#paragraph-webform') {
                const routeSlug = encodeURI(`/contact-us/partner?partner=${partner.name}`);
                const route = await queue.add(() => client.fetch(`//groq
                  *[_type=="route" && slug.current=="${routeSlug}"]{
                    "_type": "reference",
                    "_ref": _id,
                    "_key": "${uuidv4()}"
                  }[0]
                `));
                if (_.isEmpty(route)) {
                  return null;
                }
                return {
                  _key: uuidv4(),
                  _type: 'button',
                  color: 'primary',
                  text: buttonCta.text(),
                  link: {
                    _type: 'link',
                    link: [route],
                    title: buttonCta.text(),
                  },
                };
              }
              return null;
            } catch (err) {
              console.log(err);
              return null;
            }
          })
          .get(),
      );
      return ctaButtons.filter(_.negate(_.isEmpty));
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    convertHeroBannerHtmlToSanity: async ($html) => {
      try {
        const button = await getButtonCta($html);
        const heroBannerSection = {
          _id: uuidv4(),
          _type: 'slantBanner',
          _key: uuidv4(),
          paddingTop: 'medium',
          textBlock: {
            _type: 'textBlock',
            align: 'left',
            headingText: $html('.subtitle-text')
              .text()
              .trim(),
            headingTextColor: 'white',
            button,
          },
        };
        const imageUrlRegex = /(https?:\/\/.*\.(?:jpg|gif|png|jpeg))/;
        const backgroundImageURL = _.pipe(
          _.getOr('', 'background-image'),
          getFirstTextThatMatches.bind(null, imageUrlRegex),
        )($html('.paragraph-bundle__hero-banner').css());
        if (backgroundImageURL) {
          const backgroundAsset = await createSanityAssetFromUrl(
            backgroundImageURL,
            'image',
          );
          if (backgroundAsset) {
            heroBannerSection.backgroundImage = {
              _type: 'csodImage',
              alt: '',
              asset: {
                _ref: backgroundAsset._id,
                _type: 'reference',
              },
            };
          }
        }
        const iconURL = $html('.hero-banner__image img').attr('src');
        const iconAsset = await createSanityAssetFromUrl(iconURL, 'image');
        if (iconAsset) {
          heroBannerSection.textBlock.icon = {
            _type: 'csodImage',
            asset: {
              _ref: iconAsset._id,
              _type: 'reference',
            },
          };
        }
        return heroBannerSection;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    convertHeadingBannerHtmlToSanity: async ($html) => {
      try {
        const button = await getButtonCta($html);
        const headingBannerSection = {
          _id: uuidv4(),
          _key: uuidv4(),
          _type: 'oneColumnSection',
          textBlock: {
            _type: 'textBlock',
            align: 'center',
            headingText: $html('.title-text')
              .text()
              .trim(),
            headingTextColor: 'darkGray',
            button,
          },
        };
        return headingBannerSection;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    convertFullTopUIHtmlToSanity: async ($html) => {
      try {
        const button = await getButtonCta($html);
        const oneColumnSection = {
          _id: uuidv4(),
          _key: uuidv4(),
          _type: 'oneColumnSection',
          textBlock: {
            _type: 'textBlock',
            align: 'center',
            headingText: $html('.title-text')
              .text()
              .trim(),
            headingTextColor: 'darkGray',
            description: $html('p')
              .text()
              .trim(),
            descriptionColor: 'gray',
            button,
          },
        };
        const imageURL = $html('.image-wrap')
          .find('img')
          .attr('src');
        if (imageURL) {
          const imageAsset = await createSanityAssetFromUrl(imageURL, 'image');
          if (imageAsset) {
            oneColumnSection.imageOrProductScreen = [
              {
                _key: uuidv4(),
                _type: 'csodImage',
                asset: {
                  _type: 'reference',
                  _ref: imageAsset._id,
                },
              },
            ];
          }
        }
        return oneColumnSection;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    convertAssetDownloadHtmlToSanity: async ($html) => {
      try {
        const assetDownloadSection = {
          _id: uuidv4(),
          _key: uuidv4(),
          _type: 'twoColumnSection',
          leftBlock: {
            columnAlign: 'center',
            columnBlocks: [
              {
                _key: uuidv4(),
                _type: 'textBlockContent',
                heading: $html('.title-text')
                  .text()
                  .trim(),
                content: htmlToPortableText($html('p').html()),
              },
            ],
          },
        };
        const assetButton = $html('.button_cta a ');
        const assetUrl = assetButton.attr('href');
        const label = assetButton.text().trim();
        const previewUrl = $html('.asset-image').attr('src');
        const previewAsset = await createSanityAssetFromUrl(previewUrl, 'image');
        const asset = await createSanityAssetFromUrl(assetUrl, 'file');
        if (asset && previewAsset) {
          assetDownloadSection.rightBlock = {
            _type: 'csodColumn',
            columnAlign: 'center',
            columnBlocks: [
              {
                _key: uuidv4(),
                _type: 'downloadAsset',
                asset: {
                  _type: 'file',
                  asset: {
                    _type: 'reference',
                    _ref: asset._id,
                  },
                },
                label,
                preview: {
                  _type: 'image',
                  asset: {
                    _ref: previewAsset._id,
                    _type: 'reference',
                  },
                },
              },
            ],
          };
        }
        return assetDownloadSection;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    convertCategoryRowHtmlToSanity: async ($html) => {
      try {
        const getProductSegmentReferenceFromHtml = (title, type) => $html('.paragraph-bundle__category-item')
          .filter(
            (index, element) => $html(element)
              .find('.subtitle-text')
              .text()
              .trim() === title,
          )
          .map(async (index, element) => {
            try {
              const categories = JSON.stringify(
                $html(element)
                  .find('li')
                  .map((_index, listElement) => $html(listElement)
                    .text()
                    .trim())
                  .get(),
              );
              const query = `//groq
                    *[_type=="${type}" && name in ${categories}]{
                      "_key": _id,
                      "_ref": _id,
                      "_type": "reference"
                    }`;
              return queue.add(() => client.fetch(query));
            } catch (err) {
              console.log(err);
              return null;
            }
          })
          .get(0);

        const types = await getProductSegmentReferenceFromHtml(
          'Type:',
          'partnerType',
        );
        const categories = await getProductSegmentReferenceFromHtml(
          'Category:',
          'partnerProductCategory',
        );
        const verticals = await getProductSegmentReferenceFromHtml(
          'Vertical:',
          'partnerVertical',
        );
        const regions = await getProductSegmentReferenceFromHtml(
          'Region:',
          'region',
        );

        const productSegmentSection = {
          _id: uuidv4(),
          _key: uuidv4(),
          _type: 'productSegmentSection',
          title: $html('.title-text')
            .text()
            .trim(),
          types,
          categories,
          verticals,
          regions,
        };
        return productSegmentSection;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    convertSplitWithImageHtmlToSanity: async ($html) => {
      try {
        const getColumnBlocks = async (column) => {
          try {
            if (column.hasClass('content-wrap')) {
              return {
                _type: 'csodColumn',
                columnAlign: 'center',
                columnBlocks: [
                  {
                    _key: uuidv4(),
                    _type: 'textBlockContent',
                    content: htmlToPortableText(
                      column.find('.content-wrap-inner').html(),
                    ),
                  },
                ],
              };
            }
            const imageURL = column.find('img').attr('src');
            const imageAsset = await createSanityAssetFromUrl(imageURL, 'image');
            if (imageAsset) {
              return {
                _type: 'csodColumn',
                columnAlign: 'center',
                columnBlocks: [
                  {
                    _key: uuidv4(),
                    _type: 'csodImage',
                    asset: {
                      _type: 'reference',
                      _ref: imageAsset._id,
                    },
                  },
                ],
              };
            }
            return null;
          } catch (err) {
            console.log(err);
            return null;
          }
        };
        const twoColumnSection = {
          _id: uuidv4(),
          _type: 'twoColumnSection',
          _key: uuidv4,
          leftBlock: await getColumnBlocks($html('.left')),
          rightBlock: await getColumnBlocks($html('.right')),
        };
        return twoColumnSection;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    convertCarouselHtmlToSanity: async ($html) => {
      try {
        const carouselCards = await Promise.all(
          $html('.accordion__item')
            .map(async (index, element) => {
              const elementInstance = $html(element);
              const carouselCard = {
                _key: uuidv4(),
                _type: 'carouselCard',
                headingText: elementInstance
                  .find('.accordion__item-title')
                  .text()
                  .trim(),
                description: elementInstance
                  .find('.accordion__item-content')
                  .text()
                  .trim(),
              };
              const backgroundElement = elementInstance.find('img');
              const backgroundURL = backgroundElement.attr('src');
              const carouselBg = await createSanityAssetFromUrl(
                backgroundURL,
                'image',
              );
              if (carouselBg) {
                carouselCard.carouselBg = {
                  _type: 'csodImage',
                  asset: {
                    _type: 'reference',
                    _ref: carouselBg._id,
                  },
                };
              }
              const ovalButtons = $html('.oval-button');
              const ovalButton = elementInstance.find(ovalButtons);
              if (ovalButton.get().length > 0) {
                carouselCard.animatedButton = {
                  _type: 'animatedButton',
                  color: 'primary',
                  link: {
                    _type: 'link',
                    link: [
                      {
                        _key: uuidv4(),
                        _type: 'externalLink',
                        externalLink: ovalButton.attr('href'),
                      },
                    ],
                    text: ovalButton.text().trim(),
                  },
                };
              }
              return carouselCard;
            })
            .get(),
        );

        const carouselSection = {
          _key: uuidv4(),
          _type: 'carouselSection',
          sectionHeading: $html('.accordion__mobile-title')
            .text()
            .trim(),
          carouselCards,
        };
        return carouselSection;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    convertIconRowHtmlToSanity: async ($html) => {
      try {
        const items = $html('.paragraph-bundle__icon-item');
        const links = $html('a');
        const isTilesSection = items.length === links.length;
        if (isTilesSection) {
          const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/i;
          const tiles = items
            .map(async (index, element) => {
              try {
                const elementInstance = $html(element);
                const linkElement = elementInstance.find('a');
                if (linkElement.length > 0) {
                  const heading = elementInstance
                    .find('h3')
                    .text()
                    .trim();
                  const subheading = elementInstance
                    .find('p')
                    .text()
                    .trim();
                  const linkUrl = linkElement.attr('href');
                  const tileImageURL = elementInstance.find('img').attr('src');
                  const tileImage = await createSanityAssetFromUrl(
                    tileImageURL,
                    'image',
                  );
                  if (youtubeRegex.test(linkUrl)) {
                    const videoTile = {
                      _key: uuidv4(),
                      _type: 'videoTile',
                      heading,
                      subheading,
                    };
                    if (tileImage) {
                      videoTile.video = {
                        _type: 'inlineVideo',
                        thumbnail: {
                          _type: 'csodImage',
                          asset: {
                            _ref: tileImage._id,
                            _type: 'reference',
                          },
                        },
                        videoURL: {
                          _type: 'video',
                          embedCode: getEmbedCodeForUrl(linkUrl),
                          url: linkUrl,
                        },
                      };
                    }
                    return videoTile;
                  }
                  const linkTile = {
                    _type: 'linkTile',
                    _key: uuidv4(),
                    heading,
                    subheading,
                    link: {
                      _type: 'link',
                      text: '',
                      link: [
                        {
                          _type: 'externalLink',
                          _key: uuidv4(),
                          externalLink: linkUrl,
                        },
                      ],
                    },
                  };
                  if (tileImage) {
                    linkTile.tileImage = {
                      _type: 'csodImage',
                      asset: {
                        _type: 'reference',
                        _ref: tileImage._id,
                      },
                    };
                  }
                  return linkTile;
                }
                return null;
              } catch (err) {
                console.log(err);
                return null;
              }
            })
            .get();
          const tilesSection = {
            _type: 'tilesSection',
            _key: uuidv4(),
            sectionHeading: $html('.title-text')
              .text()
              .trim(),
            tiles: await Promise.all(tiles),
          };
          return tilesSection;
        }
        const icons = items
          .map(async (index, element) => {
            try {
              const elementInstance = $html(element);
              const icon = {
                _type: 'captionedIcon',
                _key: uuidv4(),
                caption: elementInstance
                  .find('h3')
                  .text()
                  .trim(),
                description: elementInstance
                  .find('p')
                  .text()
                  .trim(),
              };
              const iconURL = elementInstance.find('img').attr('src');
              const iconAsset = await createSanityAssetFromUrl(iconURL, 'image');
              if (iconAsset) {
                icon.icon = {
                  _type: 'csodImage',
                  asset: {
                    _type: 'reference',
                    _ref: iconAsset._id,
                  },
                };
              }
              return icon;
            } catch (err) {
              console.log(err);
              return err;
            }
          })
          .get();
        const iconGridSection = {
          _type: 'iconGridSection',
          _key: uuidv4(),
          heading: $html('.title-text')
            .text()
            .trim(),
          icons: await Promise.all(icons),
          iconSize: 100,
        };
        return iconGridSection;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  };
};
