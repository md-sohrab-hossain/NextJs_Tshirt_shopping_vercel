import React from "react";
import style from "../../../styles/shopping/checkout/checkout_item.module.scss";

const CheckoutItem = ({ cartItem }) => {
  const { count, images, totalPrice, productInfo } = cartItem;
  return (
    <div className={style.checkout}>
      <div className={style.checkout__image}>
        <img src={images[0].url} alt="item" />
      </div>

      <span className={style.checkout__name}>{productInfo[0].name}</span>
      <span className={style.checkout__quantity}>
        <div className={style.checkout__arrow} onClick={() => {}}>
          &#10094;
        </div>
        <span className={style.checkout__value}>{count}</span>
        <div className={style.checkout__arrow} onClick={() => {}}>
          &#10095;
        </div>
      </span>
      <span className={style.checkout__price}>{totalPrice}/=</span>
      <div className={style.checkout__removeButton} onClick={() => {}}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
