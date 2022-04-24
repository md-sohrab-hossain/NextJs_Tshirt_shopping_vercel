import { useDeleteOrder } from 'api/useDeleteOrder';
import { useGetOrderList } from 'api/useGetOrderList';
import { useOrderNewProduct } from 'api/useOrderNewProduct';
import axios from 'axios';
import getStripe from 'Backend/utils/getStripe';
import Loading from 'components/atoms/loading';
import Modal from 'components/molecules/modal';
import OrderList from 'components/molecules/order-item-list';
import { useGetAbsoluteUrl } from 'libs/utils';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(() => 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProductId, setRemoveProductId] = useState(null);
  const [isShowLoading, setIsShowLoading] = useState(() => false);
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  const absoluteUrl = useGetAbsoluteUrl();
  const { mutate: removeOrder } = useDeleteOrder();
  const { mutate: updateQuantity } = useOrderNewProduct();
  const { data: orderList, isLoading, refetch } = useGetOrderList(absoluteUrl);

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
    setIsShowLoading(true);

    const order = {
      product,
      quantity,
      price,
      images,
      paymentInfo,
    };

    updateQuantity(order, {
      onSuccess: () => {
        refetch();
        setIsShowLoading(false);
      },
      onError: ({ data }) => toast.error(data.message),
    });
  }, []);

  const handleRemove = useCallback(id => {
    setRemoveProductId(id);
    setIsModalOpen(true);
  }, []);

  const handleModal = useCallback((isRemoved, id) => {
    setIsModalOpen(false);

    if (isRemoved) {
      setIsShowLoading(true);
      removeOrder(id, {
        onSuccess: () => {
          refetch();
          setIsShowLoading(false);
          toast.warning('🚀Order remove successfully!!');
        },
        onError: ({ data }) => {
          setIsShowLoading(false);
          toast.error(data.message);
        },
      });
    }
  }, []);

  console.log('order list --', orderList?.orders);
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
        <Modal message="Do you want to remove this item?" onClick={handleModal} removeProductId={removeProductId} />
      )}
      {(isRoutesChange || isShowLoading) && <Loading overlay />}
    </>
  );
};

export default CheckoutPage;
