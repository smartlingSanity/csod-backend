/* eslint-disable import/no-unresolved */
import React, {
  forwardRef, useImperativeHandle, useRef, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import Fieldset from 'part:@sanity/components/fieldsets/default';
import { FormBuilderInput, withDocument } from 'part:@sanity/form-builder';
import { setIfMissing } from 'part:@sanity/form-builder/patch-event';
import client from 'part:@sanity/base/client';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import pipe from 'lodash/fp/pipe';
import useUserInfo from './useUserInfo';

const LocaleInput = forwardRef(
  (
    {
      document,
      type,
      level,
      markers,
      value,
      readOnly,
      filterField,
      onChange,
      focusPath,
      onFocus,
      onBlur,
    },
    ref,
  ) => {
    const [userInfo] = useUserInfo();

    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    const handleChange = (field, fieldPatchEvent) => {
      onChange(
        fieldPatchEvent
          .prefixAll(field.name)
          .prepend(setIfMissing({ _type: type.name })),
      );
    };

    const [enabledLocale, setEnabledLocale] = useState(document.enabledLocale || false);

    useEffect(() => {
      if (document._type === 'route') {
        client
          .fetch(
            `//groq
            *[route._ref == '${document._id.toString().replace('drafts.', '')}']{
              enabledLocale
            }  
            `,
          )
          .then((result) => {
            setEnabledLocale(result[0].enabledLocale || false);
          });
      } else {
        setEnabledLocale(document.enabledLocale);
      }
    }, [document._id, document._type, document.enabledLocale]);

    return (
      <Fieldset
        level={level}
        legend={type.title}
        description={type.description}
      >
        {type.fields.map((field, index) => {
          const _readOnly = readOnly || !includes(field.name, userInfo.enabledLocales);

          const hideField = typeof (enabledLocale) !== 'undefined' && enabledLocale !== 'all' && enabledLocale !== field.name;

          if (typeof filterField === 'function' && !filterField(type, field)) {
            return null;
          }

          return (
            <div style={{ display: hideField ? 'none' : '' }}>
              <FormBuilderInput
                level={level + 1}
                ref={index === 0 ? inputRef : null}
                key={field.name}
                type={field.type}
                value={value && value[field.name]}
                onChange={patchEvent => handleChange(field, patchEvent)}
                markers={markers.filter(
                  pipe(getOr([], 'item.paths.0'), includes(field.name)),
                )}
                path={[field.name]}
                focusPath={focusPath}
                onFocus={onFocus}
                onBlur={onBlur}
                filterField={filterField}
                readOnly={_readOnly}
              />
            </div>
          );
        })}
      </Fieldset>
    );
  },
);

LocaleInput.propTypes = {
  document: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    fields: PropTypes.instanceOf(Array),
  }).isRequired,
  level: PropTypes.number.isRequired,
  markers: PropTypes.instanceOf(Array).isRequired,
  focusPath: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  filterField: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

LocaleInput.defaultProps = {
  readOnly: false,
};

export default withDocument(LocaleInput);
