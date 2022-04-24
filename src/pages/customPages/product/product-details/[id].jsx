import { useGetOrderList } from 'api/useGetOrderList';
import { useGetProductDetails } from 'api/useGetProductDetails';
import { useOrderNewProduct } from 'api/useOrderNewProduct';
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
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const { mutate: orderProduct } = useOrderNewProduct();

  const absoluteUrl = useGetAbsoluteUrl();
  const { refetch } = useGetOrderList(absoluteUrl);

  const { data: productDetails, isLoading } = useGetProductDetails(absoluteUrl, router.query.id);
  const { price, ratings, numOfReviews, name, description, images, _id } = productDetails || {};

  const handleOrder = useCallback(() => {
    if (!quantity) return toast.warning('Please Select Quantity!');
    setIsOrderComplete(true);

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
        setIsOrderComplete(false);
        toast.success(data.message);
      },
      onError: () => {
        setIsOrderComplete(false);
        toast.error('Something went wrong!!');
      },
    });
  }, [quantity]);

  const handleQuantity = selectedItem => setQuantity(selectedItem);
  if (isLoading) return <Loading square />;

  return (
    <div className="p-product-details">
      <ProductDetails
        loading={isOrderComplete}
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
