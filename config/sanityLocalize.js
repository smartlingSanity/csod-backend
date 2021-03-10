const path = require('path');

const localizePath = path.join(__dirname, '../src/migrations/l10n/index.js');
const safeSanityExec = require('./safeSanityExec');

safeSanityExec(`node ${localizePath}`);
