import React from 'react';
import Link from 'next/link';
import style from './cartitem.module.scss';

const CartItems = ({ item }) => {
  return (
    <div className={style.cart_item}>
      <img src={item.images[0].url} alt="item" />
      <div className={style.cart_item__details}>
        <span className={style.cart_item__details__name}>
          <Link href={`/customPages/product/${item.product}`}>
            <a>{item.productInfo[0].name}</a>
          </Link>
        </span>
        <span className={style.cart_item__details__name__price}>{item.price}/=</span>
      </div>
    </div>
  );
};

export default CartItems;
