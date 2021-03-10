/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { IconContext } from 'react-icons';
import styles from './Icon.module.css';

function CloseIcon({ onClick }) {
  return (
    <IconContext.Provider
      value={{ className: `${styles.icon} ${styles['close-icon']}` }}
    >
      <button className={styles['invisible-button']} type="button" onClick={onClick}>
        <MdClose />
      </button>
    </IconContext.Provider>
  );
}

CloseIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseIcon;
