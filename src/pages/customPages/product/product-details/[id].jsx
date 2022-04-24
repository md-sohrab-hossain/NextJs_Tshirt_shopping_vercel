import { useGetOrderList } from 'api/useGetOrderList';
import { useGetProductDetails } from 'api/useGetProductDetails';
import { usePostNewOrder } from 'api/usePostNewOrder';
import Loading from 'components/atoms/loading';
import ProductDetails from 'components/organisms/product-details';
import { QUANTITY } from 'constants/options';
import { useGetAbsoluteUrl } from 'libs/utils';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(null);
  const { mutate: orderProduct } = usePostNewOrder();

  const absoluteUrl = useGetAbsoluteUrl();
  const { refetch } = useGetOrderList(absoluteUrl);

  const { data: productDetails, isLoading } = useGetProductDetails(absoluteUrl, router.query.id);
  const { price, ratings, numOfReviews, name, description, images, _id } = productDetails || {};

  const handleOrder = useCallback(() => {
    if (!quantity) return toast.warning('Please Select Quantity!');

    const order = {
      product: _id,
      quantity,
      price,
      images,
      paymentInfo: {
        id: 'STRIPE_PAYMENT_ID',
        status: 'STRIPE_PAYMENT_STATUS',
      },
    };

    orderProduct(order, {
      onSuccess: ({ data }) => {
        refetch();
        toast.success(data.message);
      },
      onError: ({ data }) => toast.error(data.message),
    });
  }, [quantity]);

  const handleQuantity = selectedItem => setQuantity(selectedItem);
  if (isLoading) return <Loading square />;

  return (
    <div className="p-product-details">
      <ProductDetails
        loading={isLoading}
        images={images}
        brandName={name}
        price={price}
        rating={ratings}
        description={description}
        reviews={numOfReviews}
        title="Product Details"
        onClick={handleOrder}
        quantity={QUANTITY}
        handleQuantity={handleQuantity}
      />
    </div>
  );
};

export default ProductDetailsPage;
