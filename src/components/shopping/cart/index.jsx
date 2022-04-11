import React from 'react';
import Icon from '../../atoms/icon';
import style from './index.module.scss';

const CartIcon = ({ openCart, orderList }) => (
  <div className={style.cart} onClick={openCart}>
    <Icon name="shopping-bag" className={style.cart__icon} />
    <span className={style.cart__count}>{orderList?.orders.length || 0}</span>
  </div>
);

export default CartIcon;
