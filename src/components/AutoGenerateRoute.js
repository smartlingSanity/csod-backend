/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, {
  useCallback, useEffect, useImperativeHandle, useState,
} from 'react';
import PropTypes from 'prop-types';
import { withDocument } from 'part:@sanity/form-builder';
import Button from 'part:@sanity/components/buttons/default';
import FormField from 'part:@sanity/components/formfields/default';
import TextInput from 'part:@sanity/components/textinputs/default';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import client from 'part:@sanity/base/client';
import { isEmpty, getOr } from 'lodash/fp';
import pluralize from 'pluralize';
import uuid from 'uuid/v4';
import LinkIcon from './LinkIcon';
import styles from './RouteInput.module.css';
import { slugify } from '../../schemas/utils/index';
import CloseIcon from './CloseIcon';
import validation from '../../schemas/utils/validation';

const DEFAULT_PREFIX = 'no-prefix';

const AutoGenerateRoute = (props) => {
  const {
    level, type, focusPath, onFocus, value, onChange, markers,
  } = props;
  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState(null);
  const [route, setRoute] = useState(null);

  const routeSlug = getOr('', 'slug.current', route);
  const _type = getOr(null, 'document._type', props);
  const isResourceDetailPage = _type === 'resourceDetailPage';
  const resourceTypeRef = getOr('', 'document.resourceType._ref', props);
  const errors = [];

  const enabledLocale = getOr('', 'document.enabledLocale', props);
  const title = getOr(null, 'document.title', props);
  const isGlobal = enabledLocale === 'all';
  const missingLocales = validation.getMissingLocales(title || {});

  const isLocaleTitleDefined = enabledLocale
    ? isGlobal
      ? isEmpty(missingLocales)
      : !missingLocales.map(locale => locale.id).includes(enabledLocale)
    : false;
  const localeTitle = isLocaleTitleDefined
    ? title[isGlobal ? 'us' : enabledLocale]
    : null;

  const isButtonDisabled = !prefix
    || !isLocaleTitleDefined
    || (isResourceDetailPage && !resourceTypeRef)
    || !isEmpty(errors)
    || loading;

  useImperativeHandle(null, () => ({
    focus: () => {},
  }));

  useEffect(() => {
    async function fetchPrefix() {
      try {
        setLoading(true);
        const _prefix = await client.fetch(
          `//groq
          *[_type == "routePrefix" && pageType == "${_type}"][0].prefix.current`,
        );
        setLoading(false);
        setPrefix(_prefix || DEFAULT_PREFIX);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchPrefix();
  }, [_type]);

  useEffect(() => {
    const routeId = getOr('', '_ref', value);
    setLoading(true);
    client
      .fetch(
        `//groq
          *[_type == "route" && _id == "${routeId}"][0]
          `,
      )
      .then((_route) => {
        setLoading(false);
        setRoute(_route);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [value]);

  const onClickGenerateRoute = useCallback(async () => {
    try {
      setLoading(true);
      let url = null;
      switch (_type) {
        case 'resourceDetailPage': {
          const resourceType = await client.fetch(`//groq
            *[_type == "filterItem" && _id == "${resourceTypeRef}"][0]  
          `);
          if (resourceType && localeTitle) {
            url = `/resources/${slugify(
              pluralize(resourceType.name),
            )}/${slugify(localeTitle)}`;
          } else {
            url = '';
          }
          break;
        }
        default: {
          if (localeTitle) {
            const slug = slugify(localeTitle);
            if (prefix && prefix !== DEFAULT_PREFIX) {
              url = `${prefix}${slug}`;
            } else {
              url = `/${slug}`;
            }
          } else {
            url = '';
          }
          break;
        }
      }

      if (url) {
        const routeId = route ? route._id : uuid();
        const _route = await client.createOrReplace({
          _id: routeId,
          _type: 'route',
          routeName: title,
          enabled: true,
          slug: {
            current: url,
          },
        });

        onChange(
          PatchEvent.from(
            set({
              _type: 'reference',
              _ref: _route._id,
            }),
          ),
        );

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [_type, title, onChange, prefix, resourceTypeRef, route, localeTitle]);

  const unsetRoute = useCallback(() => {
    onChange(PatchEvent.from(unset()));
    setRoute(null);
  }, [onChange]);

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
        <div
          className={`${styles['input-wrapper']} ${styles['padding-right-input']}`}
        >
          <TextInput
            className={styles.input}
            label="Page URL"
            placeholder={loading ? 'Loading...' : 'Page URL'}
            disabled
            value={routeSlug}
          />
          {route && (
            <div className={styles['link-container']}>
              <LinkIcon
                intent="edit"
                params={{ id: route._id, type: route._type }}
              />
              <CloseIcon onClick={unsetRoute} />
            </div>
          )}
        </div>
        <div className={styles['button-wrapper']}>
          <Button disabled={isButtonDisabled} onClick={onClickGenerateRoute}>
            Generate
          </Button>
        </div>
      </div>
    </FormField>
  );
};

AutoGenerateRoute.defaultProps = {
  value: null,
};

AutoGenerateRoute.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  level: PropTypes.number.isRequired,
  value: PropTypes.shape({
    _type: PropTypes.string.isRequired,
    _ref: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  focusPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  markers: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default withDocument(AutoGenerateRoute);
