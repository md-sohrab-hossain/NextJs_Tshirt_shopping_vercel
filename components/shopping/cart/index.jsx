import React from "react";
import style from "../../../styles/shopping/cart/icon.module.scss";

const CartIcon = ({ openCart, orderList }) => (
  <div className={style.cart} onClick={openCart}>
    <img src="/shoppingBag.svg" alt="" className={style.cart__icon} />
    <span className={style.cart__count}>{orderList?.orders.length || 0}</span>
  </div>
);

export default CartIcon;
