/**
 * outputs a sanity.json file used by Sanity
 * updates dataset depending on environment
 * as well as locale
 */
const { writeFileSync } = require('fs');
const path = require('path');
const { intlCodes } = require('./intlConfig');

const datasetLocale = process.env.INTL_ENV || 'us';

if (!intlCodes.includes(datasetLocale)) {
  throw new Error(
    `Incorrect INTL_ENV ('${datasetLocale}'). Check environment variable entered in Netlify!`,
  );
}

// eslint-disable-next-line no-console
console.log(`Using locale: ${datasetLocale}`);

// eslint-disable-next-line
const sanityEnv = process.env.GATSBY_PREVIEW_ENV || process.env.CSOD_ENV || "development";

// eslint-disable-next-line no-console
console.log(`sanityEnv: ${sanityEnv}`);

const sanityConfig = {
  root: true,
  project: {
    name: 'project-jam',
  },
  env: {
    production: {
      api: {
        projectId: '6o5inujd',
        dataset: `${datasetLocale}--prod`,
      },
      plugins: [
        '@sanity/base',
        '@sanity/components',
        '@sanity/default-layout',
        '@sanity/default-login',
        '@sanity/desk-tool',
        '@sanity/dashboard',
        '@sanity/rich-date-input',
        'dashboard-widget-netlify',
        'scheduler-dashboard',
        'csod-logo',
        '@sanity/language-filter',
        'media',
        'datatable',
      ],
    },
    development: {
      api: {
        projectId: '6o5inujd',
        dataset: `${datasetLocale}--dev`,
        token: '',
      },
      plugins: [
        '@sanity/base',
        '@sanity/components',
        '@sanity/default-layout',
        '@sanity/default-login',
        '@sanity/desk-tool',
        '@sanity/vision',
        '@sanity/dashboard',
        '@sanity/rich-date-input',
        'dashboard-widget-netlify',
        'scheduler-dashboard',
        'csod-logo',
        '@sanity/language-filter',
        'media',
        'datatable',
      ],
    },
    stage: {
      api: {
        projectId: '6o5inujd',
        dataset: `${datasetLocale}--stage`,
      },
      plugins: [
        '@sanity/base',
        '@sanity/components',
        '@sanity/default-layout',
        '@sanity/default-login',
        '@sanity/desk-tool',
        '@sanity/dashboard',
        '@sanity/rich-date-input',
        'dashboard-widget-netlify',
        'scheduler-dashboard',
        'csod-logo',
        '@sanity/language-filter',
        'media',
        'datatable',
      ],
    },
  },
  parts: [
    {
      name: 'part:@sanity/base/schema',
      path: './schemas/schema.js',
    },
    {
      implements: 'part:@sanity/dashboard/config',
      path: 'src/dashboardConfig.js',
    },
    {
      name: 'part:@sanity/desk-tool/structure',
      path: 'src/deskStructure/deskStructure.js',
    },
    {
      name: 'part:@sanity/language-filter/config',
      path: 'config/languageFilterConfig.js',
    },
    {
      implements: 'part:@sanity/base/document-badges/resolver',
      path: 'src/documentBadges/resolver.js',
    },
    {
      implements: 'part:@sanity/base/document-actions/resolver',
      path: 'src/documentActions/resolver.js',
    },
  ],
};

const { env, ...config } = sanityConfig;

if (!env[sanityEnv]) {
  throw new Error(`No config for environment '${sanityEnv}'`);
}

if (process.env.SANITY_DATASET) {
  env[sanityEnv].api.dataset = process.env.SANITY_DATASET;
}

// eslint-disable-next-line no-console
console.log(`Using dataset: ${env[sanityEnv].api.dataset}`);

const sanityJson = {
  ...config,
  ...env[sanityEnv],
};

const outputFile = path.join(__dirname, '..', 'sanity.json');

const output = JSON.stringify(sanityJson, null, 2);

writeFileSync(outputFile, output);

const sanityDefaultLoginFile = path.join(__dirname, '@sanity', 'default-login.json');

const loginEntries = process.env.OKTA_EMBED_URL && process.env.ENABLE_CSOD_SSO === 'true' ? [{
  name: 'SSOSanityOkta',
  title: 'OKTA SSO',
  url: process.env.OKTA_EMBED_URL,
}] : [];

writeFileSync(sanityDefaultLoginFile, JSON.stringify({
  providers: {
    mode: process.env.CSOD_SSO_PROVIDER_MODE || 'append',
    redirectOnSingle: process.env.CSOD_SSO_REDIRECT_ON_SINGLE === 'true',
    entries: loginEntries,
  },
}, null, 2));
