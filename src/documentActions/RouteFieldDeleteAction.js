/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useDocumentOperation } from '@sanity/react-hooks';
import client from 'part:@sanity/base/client';
import TrashIcon from 'part:@sanity/base/trash-icon';
import ConfirmDelete from '@sanity/desk-tool/lib/components/ConfirmDelete';

const DISABLED_REASON_TITLE = {
  NOTHING_TO_DELETE: "This document doesn't yet exist or is already deleted",
};

export default function DeleteAction({
  id,
  type,
  draft,
  published,
  onComplete,
}) {
  const { delete: deleteOp } = useDocumentOperation(id, type);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  return {
    icon: TrashIcon,
    disabled: Boolean(deleteOp.disabled),
    title:
      (deleteOp.disabled && DISABLED_REASON_TITLE[deleteOp.disabled]) || '',
    label: isDeleting ? 'Deleting…' : 'Delete',
    shortcut: 'Ctrl+Alt+D',
    onHandle: () => {
      setConfirmDialogOpen(true);
    },
    dialog: isConfirmDialogOpen && {
      type: 'legacy',
      onClose: onComplete,
      title: 'Delete',
      content: (
        <ConfirmDelete
          draft={draft}
          published={published}
          onCancel={() => {
            setConfirmDialogOpen(false);
            onComplete();
          }}
          onConfirm={() => {
            setIsDeleting(true);
            setConfirmDialogOpen(false);
            const route = draft
              ? draft.route
              : published
                ? published.route
                : null;
            deleteOp.execute();
            if (route) {
              setTimeout(() => {
                client.delete(route._ref).then(() => {
                  onComplete();
                });
              }, 1500);
            }
          }}
        />
      ),
    },
  };
}
