import { useGetOrderList } from 'api/useGetOrderList';
import axios from 'axios';
import getStripe from 'Backend/utils/getStripe';
import Loading from 'components/atoms/loading';
import Modal from 'components/molecules/modal';
import OrderList from 'components/molecules/order-item-list';
import { useGetAbsoluteUrl } from 'libs/utils';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { NewProductOrder, removeItems } from 'redux/actions/productOrderAction';

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(() => 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(null);
  const [isShowLoading, setIsShowLoading] = useState(() => false);
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  const absoluteUrl = useGetAbsoluteUrl();
  const { data: orderList, isLoading, refetch } = useGetOrderList(absoluteUrl);

  const { success } = useSelector(state => state.productOrder);
  const { success: remove } = useSelector(state => state.removeItem);

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
    if (success || remove) {
      refetch();
      setIsShowLoading(false);
    }

    remove && toast.warning('🚀Order remove successfully!!');

    return () => setIsShowLoading(false);
  }, [success, remove]);

  useEffect(() => {
    const totalOrder = orderList?.orders;
    if (totalOrder?.length) {
      const price = totalOrder.reduce((sum, number) => {
        return sum + number.totalPrice;
      }, 0);
      setTotalPrice(price);
    }
  }, [orderList]);

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
    setIsShowLoading(true);
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

  if (isLoading) return <Loading square />;
  return (
    <>
      <div className="p-shopping">
        <OrderList
          orders={orderList?.orders}
          totalPrice={totalPrice}
          handleCheckout={handleCheckout}
          handleRemove={handleRemove}
          handleQuantity={handleQuantity}
        />
      </div>
      {isModalOpen && (
        <Modal message="Do you want to remove this item?" onClick={handleModal} removeProductId={removeProduct} />
      )}
      {(isRoutesChange || isShowLoading) && <Loading overlay />}
    </>
  );
};

export default CheckoutPage;
