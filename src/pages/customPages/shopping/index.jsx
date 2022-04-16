import axios from 'axios';
import getStripe from 'Backend/utils/getStripe';
import Loading from 'components/atoms/Loading';
import OrderList from 'components/molecules/order-item-list';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMyOrders, NewProductOrder, removeItems } from 'redux/actions/productOrderAction';

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const { order } = useSelector(state => state.getMyOrderList);
  const { success } = useSelector(state => state.productOrder);
  const { success: remove } = useSelector(state => state.removeItem);

  const getRecentOrder = useCallback(() => {
    dispatch(getMyOrders());
  }, [success, remove]);

  let totalPrice = 0;

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

  const handleQuantity = useCallback((quantity, product, price, images, paymentInfo) => {
    const order = {
      product,
      quantity,
      price,
      images,
      paymentInfo,
    };

    dispatch(NewProductOrder(order));
  }, []);

  const handleRemove = useCallback(id => {
    dispatch(removeItems(id));
  }, []);

  if (!order) return <Loading />;
  return (
    <div className="p-shopping">
      <OrderList
        orders={order?.orders}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
        handleRemove={handleRemove}
        handleQuantity={handleQuantity}
      />
    </div>
  );
};

export default CheckoutPage;
