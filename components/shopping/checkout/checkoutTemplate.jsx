import React, { useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

//?-- components--//
import CheckoutItems from "./checkoutItems";
import { getMyOrders } from "../../../redux/actions/productOrderAction";
import style from "../../../styles/shopping/checkout/checkout_template.module.scss";
//?-- components--//

const CheckoutTemplate = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.getMyOrderList);
  const { success } = useSelector((state) => state.productOrder);
  const { success: remove } = useSelector((state) => state.removeItem);

  const getRecentOrder = useCallback(() => {
    dispatch(getMyOrders());
  }, [success, remove]);

  var totalPrice = 0;

  useEffect(async () => {
    if (success) getRecentOrder();
    if (remove) getRecentOrder();
  }, [success, remove]);

  const totalOrder = order?.orders;
  if (totalOrder?.length) {
    totalPrice = totalOrder.reduce((sum, number) => {
      return sum + number.totalPrice;
    }, 0);
  }

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

export default memo(CheckoutTemplate);
