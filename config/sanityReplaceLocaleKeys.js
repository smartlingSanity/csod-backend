const path = require('path');

const localizePath = path.join(__dirname, '../src/migrations/l10n/changeLocaleKeys.js');
const safeSanityExec = require('./safeSanityExec');

safeSanityExec(`sanity exec ${localizePath} --with-user-token`);
