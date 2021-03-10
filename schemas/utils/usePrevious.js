import { useEffect, useRef } from 'react';

/*
  This hook is to get the value of a variable in a previous render.
  Useful when you need to compare the previous value with the current one,
  like would be done with componentDidUpdate.
*/

export default function usePrevious(value) {
  const previousValue = useRef();
  useEffect(() => {
    previousValue.current = value;
  }, [value]);
  return previousValue;
}
