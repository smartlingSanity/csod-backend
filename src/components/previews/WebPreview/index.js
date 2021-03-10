import React from 'react';
import PropTypes from 'prop-types';
import {
  TabList, Tab, studioTheme, ThemeProvider, TabPanel,
} from '@sanity/ui';

import styles from './WebPreview.css';
import useWebPreview from './useWebPreview';
import PreviewFrame from './PreviewFrame';

const WebPreview = ({ document }) => {
  const {
    supportedLanguages, isLoading, tab, previewURL,
  } = useWebPreview(document.displayed.route);

  return (
    <ThemeProvider theme={studioTheme}>
      <div className={styles.container}>
        <TabList space={1}>
          {supportedLanguages.map(({ id, title }) => (
            <Tab
              aria-controls="iframe-panel"
              id={`${id}-tab`}
              key={id}
              label={title}
              space={2}
              selected={id === tab.current}
              onClick={() => tab.set(id)}
            />
          ))}
        </TabList>

        {!isLoading && previewURL && <PreviewURL url={previewURL} /> }

        <TabPanel aria-labelledby="" id="iframe-panel" flex={1}>
          {isLoading && <p>Loading ...</p>}
          {!isLoading && <PreviewFrame title="WebPreview" url={previewURL} />}
        </TabPanel>
      </div>
    </ThemeProvider>
  );
};
WebPreview.propTypes = {
  document: PropTypes.shape({
    displayed: PropTypes.shape({
      route: PropTypes.shape({
        _ref: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

const PreviewURL = ({ url }) => (
  <div className={styles.url}>
    Open in Browser:
    {' '}
    <a href={url} rel="noreferrer" target="_blank">{url}</a>
  </div>
);
PreviewURL.propTypes = {
  url: PropTypes.string.isRequired,
};

export default WebPreview;
