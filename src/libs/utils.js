import { getErrorObjFromErrorCode } from 'constants/frontend-errors';
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

export const ScrollTop = ({ href }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [href]);
  return null;
};

export const errorResParser = error => {
  if (!error) {
    return {
      Code: '0',
    };
  }
  return getErrorObjFromErrorCode(99999);
};
