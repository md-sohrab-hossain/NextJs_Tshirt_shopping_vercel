import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      const expandIcon = document.querySelector("i[class*='a-icon--expand']")?.classList[1];
      const shoppingCart = document.querySelector('.m-shopping-cart-items-list');
      const menuList = document.querySelector('.m-menu-list');

      if (
        (event.target.classList.contains(expandIcon) && !shoppingCart) ||
        (event.target.classList.contains('a-shopping-cart__count') && !menuList) ||
        (event.target.classList.contains('a-icon--shopping-bag') && !menuList)
      ) {
        return;
      }

      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
