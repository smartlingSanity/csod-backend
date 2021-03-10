import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import sanityClient from 'part:@sanity/base/client';
import imageUrlBuilder from '@sanity/image-url';
import cx from 'classnames';
import _ from 'lodash/fp';
import sectionPreview from './section-preview.css';

const builder = imageUrlBuilder(sanityClient);
function sanityImage(source) {
  return builder.image(source);
}

const SectionPreview = ({ value }) => {
  const title = _.getOr(null, 'title', value);
  const subtitle = _.getOr(null, 'subtitle', value);
  const media = _.getOr(null, 'media', value);
  const background = _.getOr(null, 'background', value);

  const [currentDocument, setCurrentDocument] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(null);

  const getBackgroundPosition = () => {
    if (!currentDocument || Object.keys(currentDocument).length === 0 || !background) {
      return {
        indexInBlock: 0,
        numberOfBgsInBlock: 0,
      };
    }

    const indexOfBg = currentDocument.sections.findIndex((section) => {
      const thisBackgroundSection = _.getOr(
        { _key: null },
        'sectionStyles.backgroundSection[0]',
        section,
      );
      return thisBackgroundSection._key === background._key;
    });

    // find upper bound
    const upperIndexes = [];
    for (let i = indexOfBg + 1; i < currentDocument.sections.length; i += 1) {
      const possibleBackgroundSectionMatch = _.getOr(
        [],
        'sectionStyles.backgroundSection[0]',
        currentDocument.sections[i],
      );

      if (possibleBackgroundSectionMatch._ref === background._ref) {
        upperIndexes.push(i);
      }
    }

    // find lower bound
    const lowerIndexes = [];
    for (let i = indexOfBg - 1 || 0; i >= 0; i -= 1) {
      const possibleBackgroundSectionMatch = _.getOr(
        [],
        'sectionStyles.backgroundSection[0]',
        currentDocument.sections[i],
      );

      if (possibleBackgroundSectionMatch._ref === background._ref) {
        lowerIndexes.push(i);
      }
    }


    const indicesOfBgs = [indexOfBg].concat(upperIndexes, lowerIndexes).sort();


    return {
      indexInBlock: indicesOfBgs.indexOf(indexOfBg),
      numberOfBgsInBlock: indicesOfBgs.length,
    };
  };

  useEffect(() => {
    if (!background) {
      return;
    }

    sanityClient.fetch(`
    { "desktopBgImageGROQ": 
        *[_id == "${background._ref}"][0] {
          "desktopBgImage": desktopBgImage.asset->,...
        },
      "currentDocumentGROQ": 
        *[sections[
            sectionStyles._type == 'sectionStyles' && 
            sectionStyles.backgroundSection[
              _key == "${background._key}" && _ref == "${background._ref}"
          ]]] | order(_id desc) [0]  { 
          ...
        }
    }
    `).then(
      ({ desktopBgImageGROQ, currentDocumentGROQ }) => {
        setCurrentBackground(desktopBgImageGROQ);
        setCurrentDocument(currentDocumentGROQ);
      },
    );
  }, [background]);


  const renderBackgroundPreview = () => {
    const bgUrl = currentBackground && currentBackground.desktopBgImage
      ? `url(${currentBackground.desktopBgImage.url})`
      : '';

    const { indexInBlock, numberOfBgsInBlock } = getBackgroundPosition();

    if (numberOfBgsInBlock === 0) {
      return null;
    }

    if (numberOfBgsInBlock === 1) {
      const bgCss1 = {
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
        backgroundPositionY: '0%',
        backgroundImage: bgUrl,
      };
      const bgCss2 = {
        clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
        backgroundPositionY: '100%',
        backgroundImage: bgUrl,
      };

      return (
        <>
          <div className={sectionPreview.bgShared} style={bgCss1} />
          <div className={sectionPreview.bgShared} style={bgCss2} />
        </>
      );
    }


    const bgCss = { backgroundPositionY: '', backgroundImage: bgUrl };
    // first block
    if (indexInBlock === 0) {
      bgCss.backgroundPositionY = '0%';
    } else if (indexInBlock === numberOfBgsInBlock.length - 1) {
      bgCss.backgroundPositionY = '100%';
    } else {
      bgCss.backgroundPositionY = `${indexInBlock * (100 / (numberOfBgsInBlock - 1))}%`;
    }

    return (
      <>
        <div className={sectionPreview.bgShared} style={bgCss} />
      </>
    );
  };

  const renderThumbnail = () => ((media)
    ? (
      <img
        className={sectionPreview.thumbnail}
        alt="component preview"
        src={sanityImage(media).crop('entropy').width(50).height(50)
          .fit('crop')
          .url()}
      />
    )
    : <div />);


  const titleCss = currentBackground
  && currentBackground.darkBackground
    ? cx(sectionPreview.title, sectionPreview.darkBackground) : sectionPreview.title;

  const subtitleCss = currentBackground
  && currentBackground.darkBackground
    ? cx(sectionPreview.subtitle, sectionPreview.darkBackground) : sectionPreview.subtitle;

  // eslint-disable-next-line react/prop-types
  const truncatedTitle = title && title.length > 100 ? `${title.substring(0, 100)}...` : title;

  return (
    <div>
      <div className={sectionPreview.previewContainer}>
        <div className={sectionPreview.backgroundContainer}>
          { renderBackgroundPreview() }
        </div>
        { renderThumbnail() }
        <div className={sectionPreview.content}>
          <div className={titleCss}>{truncatedTitle}</div>
          <div className={subtitleCss}>
            {subtitle}
          </div>
        </div>

      </div>
    </div>
  );
};

SectionPreview.propTypes = {
  value: PropTypes.shape({
    media: PropTypes.shape({
      _ref: PropTypes.string,
      _type: PropTypes.string,
    }),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    background: PropTypes.shape({
      _ref: PropTypes.string,
      _key: PropTypes.string,
    }),
  }),
};

SectionPreview.defaultProps = {
  value: {
    media: '',
    title: '',
    subtitle: '',
    background: null,
  },
};

export default SectionPreview;
