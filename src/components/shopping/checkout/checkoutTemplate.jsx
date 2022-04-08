import axios from 'axios';
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import getStripe from '../../../Backend/utils/getStripe';
import { getMyOrders } from '../../../redux/actions/productOrderAction';
//?-- components--//
import CheckoutItems from './checkoutItems';
//?-- components--//

const CheckoutTemplate = () => {
  const dispatch = useDispatch();

  const { order } = useSelector(state => state.getMyOrderList);
  const { success } = useSelector(state => state.productOrder);
  const { success: remove } = useSelector(state => state.removeItem);

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

  const handleCheckout = async (orderImg, priceTotal) => {
    try {
      const link = `/api/payment`;
      const { data } = await axios.get(link, {
        params: { priceTotal, orderImg },
      });

      const stripe = await getStripe();

      // Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="checkoutPage">
      <div className="checkoutPage__header">
        <div className="checkoutPage__header__block">
          <b>Product</b>
        </div>

        <div className="checkoutPage__header__block">
          <b>Description</b>
        </div>

        <div className="checkoutPage__header__block">
          <b>Quantity</b>
        </div>

        <div className="checkoutPage__header__block">
          <b>Price</b>
        </div>

        <div className="checkoutPage__header__block">
          <b>Remove</b>
        </div>
      </div>

      {order?.orders.map(item => (
        <CheckoutItems key={item._id} cartItem={item} />
      ))}

      <div className="checkoutPage__total">
        <b>TOTAL: {totalPrice}/= </b>
      </div>

      {totalPrice > 0 && (
        <button
          className="checkoutPage__button"
          onClick={() => {
            handleCheckout(order?.orders[0].images[0].url, totalPrice);
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default memo(CheckoutTemplate);
