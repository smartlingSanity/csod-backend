import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@sanity/ui';
import useEventHandler from '../../../hooks/useEventHandler';

import styles from './PreviewFrame.css';

const LoadingSpinner = () => (
  <div className={styles.loadingSpinner}>
    <Spinner size={4} />
  </div>
);

const PreviewFrame = ({ title, url }) => {
  const [isLoading, setLoading] = useState(true);

  const iframeRef = useRef();
  const handler = useCallback(() => { setLoading(false); }, []);
  useEventHandler('load', handler, iframeRef.current);

  useEffect(() => { setLoading(true); }, [url]);

  return (
    <div className={styles.previewContainer}>
      {isLoading && <LoadingSpinner />}
      <iframe
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
        ref={iframeRef}
        src={url}
        title={title}
        frameBorder="0"
      />
    </div>
  );
};
PreviewFrame.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};
PreviewFrame.defaultProps = {
  url: '',
};
export default PreviewFrame;
