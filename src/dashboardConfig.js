/* eslint-disable import/no-named-as-default */
import sanityClient from 'part:@sanity/base/client';
import intlConfig from '../config/intlConfig';

const getSitesData = () => {
  const { dataset } = sanityClient.clientConfig;
  // eslint-disable-next-line no-console
  console.log(`Using dataset: ${dataset}`);
  const datasetLocale = dataset.substring(0, 2);
  const datasetEnv = dataset.substring(4);

  return intlConfig[datasetLocale]
    && intlConfig[datasetLocale][datasetEnv]
    && intlConfig[datasetLocale][datasetEnv].netlify
    ? {
      title: intlConfig[datasetLocale][datasetEnv].netlify.title || `${datasetEnv.toUpperCase()} (csod-${datasetLocale}-${datasetEnv}.netlify.com)`,
      apiId: `${intlConfig[datasetLocale][datasetEnv].netlify.apiId}`,
      buildHookId: `${intlConfig[datasetLocale][datasetEnv].netlify.buildHookId}`,
      name: intlConfig[datasetLocale][datasetEnv].netlify.name || `csod-${datasetLocale}-${datasetEnv}`,
    }
    : { title: `No Netlify build button info found for dataset "${dataset}"` };
};

export default {
  widgets: [
    {
      name: 'netlify',
      options: {
        title: 'CSOD Netlify Deploys',
        sites: [getSitesData()],
      },
    },

    {
      name: 'scheduled-documents',
      options: {
        title: 'Scheduled Documents',
      },
    },
  ],
};
