import { useCallback, useEffect, useState } from 'react';
import client from 'part:@sanity/base/client';

/**
 * useSanityFetch uses the given GROQ query and params to fetch documents from
 * the Sanity API.
 *
 * N.B. make sure that `params` is a referentially stable object otherwise
 * you'll end up in an infinite loop.
 *
 * ```javascript
 * const query = groq`*[_type == "users" && _id == $id]`;
 * const params = useMemo(() => ({ id }), [id]) // THIS needs to be in a Memo as `{} !== {}`
 * const { data, errors, isLoading } = useSanityFetch(query, params)
 * ```
 *
 * @param {String} query GROQ query to perform
 * @param {Object} params An object which describes the params in the query, e.g. `{id: 100}`
 */
export const useSanityFetch = (query, params) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await client.fetch(query, params);
      setData(result);
      setErrors(null);
    } catch (err) {
      setData(null);
      setErrors(err);
    }
    setLoading(false);
  }, [query, params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, errors, isLoading };
};

export default useSanityFetch;
