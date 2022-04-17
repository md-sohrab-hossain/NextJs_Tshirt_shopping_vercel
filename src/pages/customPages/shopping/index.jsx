import axios from 'axios';
import getStripe from 'Backend/utils/getStripe';
import Loading from 'components/atoms/loading/index';
import Modal from 'components/molecules/modal';
import OrderList from 'components/molecules/order-item-list';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMyOrders, NewProductOrder, removeItems } from 'redux/actions/productOrderAction';

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(null);
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  const { order } = useSelector(state => state.getMyOrderList);
  const { success } = useSelector(state => state.productOrder);
  const { success: remove } = useSelector(state => state.removeItem);

  const getRecentOrder = useCallback(() => {
    dispatch(getMyOrders());
  }, [success, remove]);

  let totalPrice = 0;

  useEffect(() => {
    const handleRouteChange = () => setIsRoutesChange(false);
    const handleChangeStart = () => setIsRoutesChange(true);

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeStart', handleChangeStart);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeStart', handleChangeStart);
    };
  }, []);

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
      setIsRoutesChange(true);
      const link = `/api/payment`;
      const { data } = await axios.get(link, {
        params: { priceTotal, orderImg },
      });

      const stripe = await getStripe();

      // Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      setIsRoutesChange(false);
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
    setRemoveProduct(id);
    setIsModalOpen(true);
  }, []);

  const handleModal = useCallback((isRemoved, id) => {
    setIsModalOpen(false);
    isRemoved && dispatch(removeItems(id));
  }, []);

  if (!order) return <Loading square />;
  return (
    <>
      <div className="p-shopping">
        <OrderList
          orders={order?.orders}
          totalPrice={totalPrice}
          handleCheckout={handleCheckout}
          handleRemove={handleRemove}
          handleQuantity={handleQuantity}
        />
      </div>
      {isModalOpen && (
        <Modal message="Do you want to remove this item?" onClick={handleModal} removeProductId={removeProduct} />
      )}
      {isRoutesChange && <Loading overlay />}
    </>
  );
};

export default CheckoutPage;
