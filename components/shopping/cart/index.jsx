import React from "react";
import style from "../../../styles/shopping/cart/icon.module.scss";

const CartIcon = ({ openCart }) => (
  <div className={style.cart} onClick={openCart}>
    <img src="./shoppingBag.svg" alt="" className={style.cart__icon} />
    <span className={style.cart__count}>{0}</span>
  </div>
);

export default CartIcon;
