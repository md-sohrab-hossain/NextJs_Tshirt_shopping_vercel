const STORAGE_PREFIX = 'T-SHIRT-SHOPPING-';
/**
 * Saving data to sessionStorage.
 * see also saveToSessionStorage
 */
export const saveToSessionStorage = (name, values) => {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return;
  }

  window.sessionStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(values));
};

/**
 * load datafrom storage
 */
export const loadFromSessionStorage = name => {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null;
  }

  const serialized = window.sessionStorage.getItem(`${STORAGE_PREFIX}${name}`);

  return serialized !== null ? JSON.parse(serialized) : null;
};

export const removeFromSessionStorage = name => {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null;
  }

  window.sessionStorage.removeItem(`${STORAGE_PREFIX}${name}`);
  return null;
};

/**
 * Saving data to localStorage.
 */
export const saveToLocalStorage = (name, values) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(values));
};

/**
 * load data from localStorage
 */
export const loadFromLocalStorage = name => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  const serialized = window.localStorage.getItem(`${STORAGE_PREFIX}${name}`);

  return serialized !== null ? JSON.parse(serialized) : null;
};

export const removeFromLocalStorage = name => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  window.localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
};
