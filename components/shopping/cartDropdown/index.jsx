//?-- library --//
import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/router";
//?-- library --//

//?-- components---//
import CartItems from "../cart/CartItems";
import style from "../../../styles/shopping/cartDropdown/cartDropdown.module.scss";
//?-- components---//

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

const CartDropdown = ({ open, openCart, orderList }) => {
  const [IsOpen, setIsOpen] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(open);
    return () => {
      setIsOpen(false);
    };
  }, [open]);

  const handleRoute = useCallback(() => {
    router.push("/customPages/shopping");
  }, []);

  let domNode = useClickOutside(() => {
    setIsOpen(false);
    openCart(false);
  });

  return (
    IsOpen && (
      <div ref={domNode} className={style.cart}>
        <div className={style.cart__items}>
          {orderList?.orders.length ? (
            orderList?.orders.map((item) => (
              <CartItems key={item._id} item={item} />
            ))
          ) : (
            <span className={style.cart__items__msg}> Your Cart Is Empty!</span>
          )}
        </div>
        <div className={style.cart__button} onClick={handleRoute}>
          checkout
        </div>
      </div>
    )
  );
};

export default memo(CartDropdown);
