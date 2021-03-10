/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { useDocumentOperation } from '@sanity/react-hooks';
import ContentCopyIcon from 'part:@sanity/base/content-copy-icon';
import { useRouter } from 'part:@sanity/base/router';
import client from 'part:@sanity/base/client';
import uuid from '@sanity/uuid';

const DISABLED_REASON_TITLE = {
  NOTHING_TO_DUPLICATE:
    "This document doesn't yet exist so there's nothing to duplicate",
};

export default function RouteFieldDuplicateAction({ id, type, onComplete }) {
  const { duplicate } = useDocumentOperation(id, type);

  const router = useRouter();

  const [isDuplicating, setDuplicating] = React.useState(false);
  return {
    icon: ContentCopyIcon,
    disabled: Boolean(isDuplicating || duplicate.disabled),
    label: isDuplicating ? 'Duplicating…' : 'Duplicate',
    shortcut: 'Ctrl+Alt+C',
    title:
      (duplicate.disabled && DISABLED_REASON_TITLE[duplicate.disabled]) || '',
    onHandle: () => {
      setDuplicating(true);
      const dupeId = uuid();
      duplicate.execute(dupeId);
      setTimeout(() => {
        client
          .patch(`drafts.${dupeId}`)
          .unset(['route'])
          .commit()
          .then(() => {
            router.navigateIntent('edit', { id: dupeId, type });
            onComplete();
          });
      }, 1500);
    },
  };
}
