import { useEffect, useRef } from 'react';

const useEventHandler = (eventName, handler, element = document) => {
  const handlerRef = useRef(handler);

  // Separate useEffect here to prevent the decoupling of the event listener in
  // the event the handler changes.
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    // Use this as the event handler to have a constant for the callback, as
    // this value will get closured into the returned cleanup function.
    // This also lets us change the handler function in the `useEffect` hook
    // above without having to remove and re-add the event listener
    const handle = (e) => { handlerRef.current(e); };
    element.addEventListener(eventName, handle);

    return () => {
      element.removeEventListener(eventName, handle);
    };
  }, [eventName, element]);
};

export default useEventHandler;
