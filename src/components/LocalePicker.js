import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import getOr from 'lodash/fp/getOr';
import { PatchEvent, set, unset } from 'part:@sanity/form-builder/patch-event';
import FormField from 'part:@sanity/components/formfields/default';
import { Select, studioTheme, ThemeProvider } from '@sanity/ui';
import useUserInfo from './useUserInfo';

const useLocalePicker = (currentValue) => {
  const [userInfo] = useUserInfo();
  const getArray = getOr([]);
  const enabledLocales = getArray('enabledLocales', userInfo);
  const locales = getArray('locales', userInfo);

  const shouldShowAll = useMemo(
    () => enabledLocales.includes('us') || currentValue === 'all',
    [enabledLocales, currentValue],
  );

  const isEnabled = useMemo(
    () => currentValue === undefined
      || (currentValue === 'all' && enabledLocales.includes('us'))
      || enabledLocales.includes(currentValue),
    [enabledLocales, currentValue],
  );

  const localePickerData = useMemo(
    () => ({
      locales,
      isEnabled,
      shouldShowAll,
    }),
    [locales, isEnabled, shouldShowAll],
  );

  return localePickerData;
};

const Option = ({ id, title }) => <option value={id}>{title}</option>;
Option.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const LocalePicker = React.forwardRef((props, ref) => {
  const { type, onChange, value } = props;
  const { title, description, options } = type;

  const { locales, isEnabled, shouldShowAll } = useLocalePicker(value);

  return (
    <ThemeProvider theme={studioTheme}>
      <FormField label={title} description={description}>
        <Select
          ref={ref}
          value={value}
          onChange={e => (e.target.value
            ? onChange(PatchEvent.from(set(e.target.value)))
            : onChange(PatchEvent.from(unset())))
          }
          disabled={!isEnabled}
        >
          <option value={null} />
          {options.showAll && shouldShowAll && (
            <Option id="all" title="All Locales" />
          )}
          {locales && locales.map(l => <Option key={l.id} {...l} />)}
        </Select>
      </FormField>
    </ThemeProvider>
  );
});
LocalePicker.displayName = 'LocalePicker';
LocalePicker.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.shape({
      showAll: PropTypes.bool,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default LocalePicker;
