import { useMemo, useState } from 'react';
import sanityClient from 'part:@sanity/base/client';
import groq from 'groq';

import languageFilterConfig from '../../../../config/languageFilterConfig';
import { configForDataset } from '../../../../config/intlConfig';
import { useSanityFetch } from '../../../hooks/useSanityFetch';

const useWebPreview = (route) => {
  const defaultLanguage = languageFilterConfig.supportedLanguages.filter(l => l.isDefault)[0];
  const [selectedTab, setSelectedTab] = useState(defaultLanguage ? defaultLanguage.id : '');

  const slugQuery = groq`*[ _type == "route" && _id == $routeId] { slug }`;
  const slugParams = useMemo(() => ({ routeId: route._ref }), [route]);
  const { data, isLoading } = useSanityFetch(slugQuery, slugParams);

  const baseURL = useMemo(() => {
    const config = configForDataset(sanityClient.clientConfig.dataset);
    return config.previewUrl || 'http://localhost:8000';
  }, []);

  const previewURL = useMemo(() => {
    const slug = data && data[0].slug.current;
    if (!slug || !baseURL) return null;

    if (selectedTab === defaultLanguage.id) {
      return `${baseURL}${slug}`;
    }
    return `${baseURL}/${selectedTab}${slug}`;
  }, [baseURL, defaultLanguage.id, data, selectedTab]);

  return {
    supportedLanguages: languageFilterConfig.supportedLanguages,
    tab: { current: selectedTab, set: setSelectedTab },
    previewURL,
    isLoading,
  };
};

export default useWebPreview;
