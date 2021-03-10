import { useReducer, useEffect, useRef } from 'react';
import _ from 'lodash';
import usePrevious from './usePrevious';
import fetchStateReducer, {
  STATUSES,
  INITIAL_STATE,
  actionCreators,
} from './fetchState';

const { failure, loading, success } = actionCreators;

/** @deprecated use `src/hooks/useSanityFetch` instead */
export default function useSanityFetchDocuments(client, query) {
  const [state, dispatch] = useReducer(fetchStateReducer, INITIAL_STATE);
  const fetchQuery = useRef(
    _.debounce(async (_query) => {
      try {
        dispatch(loading());
        const data = await client.fetch(_query);
        dispatch(success(data));
      } catch (e) {
        dispatch(failure(e.message));
      }
    }, 500),
  ).current;
  const previousQuery = usePrevious(query);
  useEffect(() => {
    if (_.isEqual(previousQuery, query)) {
      return;
    }
    fetchQuery(query);
  }, [query, fetchQuery, previousQuery]);

  return { ...state, fetchQuery, loading: state.status === STATUSES.pending };
}
