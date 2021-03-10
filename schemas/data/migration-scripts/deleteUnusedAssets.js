// This script will find and delete all assets that are not referenced (in use)
// by other documents. Sometimes refered to as "orphaned" assets.
//
// Place this script somewhere and run it through
// `sanity exec <script-filename.js> --with-user-token`

/* eslint-disable no-console */
import client from 'part:@sanity/base/client'
import removeUnusedAssets from '../utils/removeUnusedAssets';

removeUnusedAssets(client)
  .catch(err => {
    if (err.message.includes('Insufficient permissions')) {
      console.error(err.message)
      console.error('Did you forget to pass `--with-user-token`?')
    } else {
      console.error(err.stack)
    }
  })
