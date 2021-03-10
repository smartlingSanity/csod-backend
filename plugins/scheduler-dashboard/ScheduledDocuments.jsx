import React, { Fragment } from 'react';
import client from 'part:@sanity/base/client';
import { IntentLink } from 'part:@sanity/base/router';
import Preview from 'part:@sanity/components/previews/default';
import listStyle from 'part:@sanity/components/lists/default-style';
import Spinner from 'part:@sanity/components/loading/spinner';
import _ from 'lodash';
import { parseISO, format } from 'date-fns';
import useSanityFetchDocuments from '../../schemas/utils/useSanityFetchDocuments';
import styles from './scheduledDocuments.css';
import usePagination from '../../schemas/utils/usePagination';
import Pagination from './Pagination';
import { getSanityDocumentsPage } from '../../schemas/utils/sanityUtils';

const INITIAL_PER_PAGE = 6;

const ScheduledDocuments = () => {
  const { page, perPage, setPage } = usePagination(INITIAL_PER_PAGE);
  const onChangePage = (_page) => {
    setPage(_page);
  };
  const baseDocumentsQuery = `//groq
  *[defined(scheduledPublishTime) 
    && scheduledPublishTime.utc >= now()
    && !(_id in path('drafts.**'))]
    | order(title asc)
    | order(scheduledPublishTime.utc asc)
`;
  const sanityQueryPage = getSanityDocumentsPage(page, perPage);
  const { data, loading } = useSanityFetchDocuments(
    client,
    `//groq
    {
      "documents": ${baseDocumentsQuery}${sanityQueryPage},
      "count": count(${baseDocumentsQuery})
    }
  `,
  );
  const documents = _.get(data, 'documents', null);
  const count = _.get(data, 'count', 0);
  const totalPages = Math.ceil(count / perPage);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Scheduled Documents</h2>
      </header>
      <section className={styles.content}>
        {loading && (
          <div className={styles.loadingWrapper}>
            <Spinner inline>
              <span style={{ marginLeft: 5 }}>Loading documents...</span>
            </Spinner>
          </div>
        )}
        {!loading && (
          <Fragment>
            {_.isEmpty(documents) && (
              <span className={styles.title}>
                There are no scheduled documents
              </span>
            )}
            {!_.isEmpty(documents) && (
              <ul className={listStyle.root}>
                {documents.map(document => (
                  <li>
                    <IntentLink
                      className={styles.link}
                      intent="edit"
                      params={{ id: document._id, type: document._type }}
                    >
                      <Preview
                        title={document.title}
                        subtitle={`Publish time: ${format(
                          parseISO(document.scheduledPublishTime.local),
                          'yyyy/MM/dd - HH:mm',
                        )}`}
                      />
                    </IntentLink>
                  </li>
                ))}
              </ul>
            )}
          </Fragment>
        )}
      </section>
      {count > 1 && (
        <footer className={styles.footer}>
          <div className={styles.rowBetween}>
            <Pagination
              currentPage={page - 1}
              totalPages={totalPages}
              onPageChange={onChangePage}
            />
            <span style={{ marginRight: '20px' }}>
              {page === totalPages
                ? (page - 1) * perPage + documents.length
                : page * perPage}
              {' '}
              of
              {' '}
              {count}
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ScheduledDocuments;
