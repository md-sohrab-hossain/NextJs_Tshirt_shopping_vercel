import React from "react";

//?-- components--//
import CheckoutItems from "./checkoutItems";
import style from "../../../styles/shopping/checkout/checkout_template.module.scss";
import Loading from "../../atoms/Loading";
//?-- components--//

const CheckoutTemplate = ({ orders }) => {
  const { order, loading } = orders;
  var totalPrice = 0;

  const totalOrder = order?.orders;
  if (totalOrder?.length) {
    totalPrice = totalOrder.reduce((sum, number) => {
      return sum + number.totalPrice;
    }, 0);
  }

  if (loading) return <Loading />;
  return (
    <div className={style.checkoutPage}>
      <div className={style.checkoutPage__header}>
        <div className={style.checkoutPage__header__block}>
          <b>Product</b>
        </div>

        <div className={style.checkoutPage__header__block}>
          <b>Description</b>
        </div>

        <div className={style.checkoutPage__header__block}>
          <b>Quantity</b>
        </div>

        <div className={style.checkoutPage__header__block}>
          <b>Price</b>
        </div>

        <div className={style.checkoutPage__header__block}>
          <b>Remove</b>
        </div>
      </div>
      {order?.orders.map((item) => (
        <CheckoutItems key={item._id} cartItem={item} />
      ))}
      <div className={style.checkoutPage__total}>
        <b>TOTAL: {totalPrice}/= </b>
      </div>
    </div>
  );
};

export default CheckoutTemplate;
