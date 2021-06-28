import React, { useRef, useState, useEffect, memo } from "react";
import style from "../../../styles/shopping/cartDropdown/cartDropdown.module.scss";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

const CartDropdown = ({ open, openCart }) => {
  const [IsOpen, setIsOpen] = useState(null);

  useEffect(() => {
    setIsOpen(open);
    return () => {
      setIsOpen(false);
    };
  }, [open]);

  let domNode = useClickOutside(() => {
    setIsOpen(false);
    openCart(false);
  });

  return (
    IsOpen && (
      <div ref={domNode} className={style.cart}>
        <div className={style.cart__items}>
          {/* {cartItems.length ? (
        cartItems.map((item) => <CartItems key={item.id} item={item} />)
      ) : (
      )} */}
          <span className={style.cart__items__msg}> Your Cart Is Empty!</span>
        </div>
        <div className={style.cart__button} onClick={() => {}}>
          checkout
        </div>
      </div>
    )
  );
};

export default memo(CartDropdown);
