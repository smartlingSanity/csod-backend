import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'part:@sanity/base/router';


class ReturnToPage extends React.PureComponent {
  setReturnAfterPublish() {
    window.localStorage.setItem('returnAfterPublish', window.location.href);
  }

  render() {
    const {
      docType,
      children,
    } = this.props;

    return (
      <a href={`/intent/create/type=${docType};template=${docType}/`} onClick={this.setReturnAfterPublish}>
        {children}
      </a>
    );
  }
}


ReturnToPage.propTypes = {
  docType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ReturnToPage;
