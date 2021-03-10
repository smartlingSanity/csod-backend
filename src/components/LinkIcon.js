/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { IntentLink } from 'part:@sanity/base/router';
import { MdLink } from 'react-icons/md';
import { IconContext } from 'react-icons';
import styles from './Icon.module.css';

function LinkIcon(props) {
  const { intent, params } = props;
  return (
    <IconContext.Provider value={{ className: styles.icon }}>
      <IntentLink intent={intent} params={params}>
        <MdLink />
      </IntentLink>
    </IconContext.Provider>

  );
}

LinkIcon.propTypes = {
  intent: PropTypes.string.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default LinkIcon;
