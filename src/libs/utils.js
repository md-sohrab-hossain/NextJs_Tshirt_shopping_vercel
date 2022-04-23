import { useEffect, useState } from 'react';
export const formatLocalDateString = date => {
  return new Date(date).toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const useGetAbsoluteUrl = () => {
  const [state, setState] = useState(() => '');

  useEffect(() => {
    setState(window.location.origin);
  }, []);

  return state;
};
