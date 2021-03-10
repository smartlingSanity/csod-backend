import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import pipe from 'lodash/fp/pipe';
import TextInput from 'part:@sanity/components/textinputs/default';
import FormField from 'part:@sanity/components/formfields/default';
import Fieldset from 'part:@sanity/components/fieldsets/default';
import PatchEvent, {
  set,
  setIfMissing,
  unset,
} from 'part:@sanity/form-builder/patch-event';
import { getEmbedCodeForUrl } from '../schemas/data/utils/video';
import useUserInfo from '../src/components/useUserInfo';

const VideoUrlWithEmbedCode = forwardRef(
  ({
    markers, type, onChange, value, level, readOnly, filterField,
  }, ref) => {
    const [user] = useUserInfo();
    const enabledLocales = getOr([], 'enabledLocales', user);

    const inputRef = useRef(null);
    const getErrors = () => markers.filter(
      marker => marker.type === 'validation' && marker.level === 'error',
    );

    const handleReceiveEmbedCode = (code, locale) => {
      onChange(
        PatchEvent.from(
          setIfMissing({ _type: type.name }),
          set(code, [`embedCode.${locale}`]),
        ),
      );
    };

    const handleBlur = locale => () => {
      const localeValue = getOr(null, `url.${locale}`, value);
      const urlErrors = getErrors().filter(marker => marker.path.length > 0);

      onChange(
        PatchEvent.from(
          setIfMissing({ _type: type.name }),
          unset([`embedCode.${locale}`]),
        ),
      );

      if (!localeValue || urlErrors.length > 0) {
        return;
      }

      handleReceiveEmbedCode(getEmbedCodeForUrl(localeValue), locale);
    };

    const handleChange = locale => (event) => {
      const nextValue = event.currentTarget.value;
      const path = [`url.${locale}`];

      if (!nextValue) {
        onChange(PatchEvent.from(unset(path)));
        return;
      }

      onChange(
        PatchEvent.from(
          setIfMissing({ _type: type.name }),
          set(nextValue, path),
        ),
      );
    };

    useImperativeHandle(ref, () => ({
      focus() {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    const errors = getErrors();

    return (
      <>
        {type.fieldsets
          .filter(fieldset => fieldset.field.name === 'url')
          .map((fieldset) => {
            if (fieldset.single) {
              return (
                <Fieldset
                  key={fieldset.field.name}
                  name={fieldset.field.name}
                  legend={fieldset.field.type.title}
                  description={fieldset.field.type.description}
                  type={fieldset.type}
                >
                  {fieldset.field.type.fields.map((field, index) => {
                    const fieldPath = `${fieldset.field.name}.${field.name}`;
                    const fieldValue = getOr(null, fieldPath, value);

                    if (!filterField(fieldset.field.type, field)) {
                      return null;
                    }

                    const fieldError = errors.find(error => error.path.includes(field.name));

                    const _readOnly = readOnly || !includes(field.name, enabledLocales);

                    return (
                      <div key={field.name}>
                        <FormField
                          markers={markers.filter(
                            pipe(
                              getOr([], 'item.paths.0'),
                              includes(field.name),
                            ),
                          )}
                          level={level + 1}
                          label={field.type.title}
                          description={field.description}
                        >
                          <TextInput
                            customValidity={fieldError || ''}
                            type={field.type}
                            ref={index === 0 ? inputRef : null}
                            value={fieldValue}
                            path={[fieldPath]}
                            readOnly={_readOnly}
                            onChange={handleChange(field.name)}
                            onBlur={handleBlur(field.name)}
                          />
                        </FormField>
                        <p>
                          <strong>Embed code: </strong>
                          {' '}
                          {(value
                            && value.embedCode
                            && value.embedCode[field.name])
                            || 'Enter a URL above.'}
                        </p>
                      </div>
                    );
                  })}
                </Fieldset>
              );
            }
            return null;
          })}
      </>
    );
  },
);

VideoUrlWithEmbedCode.propTypes = {
  type: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.instanceOf(Object).isRequired,
  markers: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  filterField: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

VideoUrlWithEmbedCode.displayName = 'VideoUrlWithEmbedCode';

export default VideoUrlWithEmbedCode;
