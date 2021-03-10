/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withDocument } from 'part:@sanity/form-builder';
import FormField from 'part:@sanity/components/formfields/default';
import TextInput from 'part:@sanity/components/textinputs/default';
import PatchEvent, { set } from 'part:@sanity/form-builder/patch-event';
import { sanitizeSlug } from '../../schemas/utils/index';
import styles from './RouteInput.module.css';

const SlugTextFunction = React.forwardRef((props, ref) => {
  const {
    level, type, focusPath, onFocus, value, onChange, markers,
  } = props;

  const onChangeInput = useCallback(
    (e) => {
      onChange(
        PatchEvent.from(set({ _type: 'slug', current: e.target.value })),
      );
    },
    [onChange],
  );

  const generateSlug = useCallback(
    _value => () => {
      const slug = sanitizeSlug(_value);
      onChange(PatchEvent.from(set({ _type: 'slug', current: slug })));
    },
    [onChange],
  );

  return (
    <FormField
      level={level}
      label={type.title}
      description={type.description}
      focusPath={focusPath}
      onFocus={onFocus}
      markers={markers}
    >
      <div className={styles.row}>
        <div className={styles['input-wrapper']}>
          <TextInput
            ref={ref}
            label={type.title}
            placeholder={type.title}
            onBlur={generateSlug(value && value.current)}
            value={value && value.current}
            onChange={onChangeInput}
          />
        </div>
      </div>
    </FormField>
  );
});

SlugTextFunction.defaultProps = {
  value: null,
};

SlugTextFunction.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  level: PropTypes.number.isRequired,
  value: PropTypes.shape({
    _type: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  focusPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  markers: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  onFocus: PropTypes.func.isRequired,
};

class SlugText extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    return <SlugTextFunction {...this.props} ref={this.inputRef} />;
  }
}

export default withDocument(SlugText);
