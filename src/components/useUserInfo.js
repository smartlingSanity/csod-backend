/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import { useEffect, useMemo } from 'react';
import groq from 'groq';
import identity from 'lodash/fp/identity';
import client from 'part:@sanity/base/client';
import useCookie from './useCookie';
import languageFilterConfig from '../../config/languageFilterConfig';

const { supportedLanguages } = languageFilterConfig;

const findLocale = id => supportedLanguages.filter(locale => locale.id === id)[0];

export const USER_COOKIE_KEY = 'desk-tool::user-info';

export default function useUserInfo() {
  const [userCookie, setUserCookie] = useCookie(USER_COOKIE_KEY);
  const userInfo = useMemo(
    () => (typeof userCookie === 'string' ? JSON.parse(userCookie) : userCookie),
    [userCookie],
  );

  const setUserInfo = ({ id, enabledLocales }) => {
    setUserCookie(
      JSON.stringify({
        id,
        enabledLocales,
      }), { expires: 1 },
    );
  };

  useEffect(() => {
    if (!userCookie) {
      const query = groq`
        *[_type == "userEntity" && (userSanityID == identity() || identity() == _id)][0]
      `;
      client
        .fetch(query)
        .then((user) => {
          setUserInfo({
            id: user.userSanityID,
            enabledLocales: user.userEntityLocales,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCookie]);

  const locales = useMemo(() => {
    if (!userInfo || !userInfo.enabledLocales) return [];

    return userInfo.enabledLocales.map(findLocale).filter(identity);
  }, [userInfo]);

  const userData = useMemo(
    () => ({
      ...userInfo,
      locales,
    }),
    [userInfo, locales],
  );

  return [userData, setUserInfo];
}
