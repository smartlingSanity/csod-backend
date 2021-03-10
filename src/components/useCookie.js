import { useState } from 'react';
import Cookie from 'js-cookie';

export default function useCookie(name) {
  const [item, setItem] = useState(Cookie.get(name));
  const setCookie = (value, options = {}) => {
    Cookie.set(name, value, options);
    setItem(value);
  };
  return [item, setCookie];
}
