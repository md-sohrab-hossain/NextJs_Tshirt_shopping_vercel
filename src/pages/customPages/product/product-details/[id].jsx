import { useGetProductDetails } from 'api/useGetProductDetails';
import Loading from 'components/atoms/loading';
import ProductDetails from 'components/organisms/product-details';
import { QUANTITY } from 'constants/options';
import { useGetAbsoluteUrl } from 'libs/utils';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from 'redux/actions/productAction';
import { NewProductOrder } from 'redux/actions/productOrderAction';

const ProductDetailsPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const absoluteUrl = useGetAbsoluteUrl();
  const [quantity, setQuantity] = useState(null);

  const { data, isLoading } = useGetProductDetails(absoluteUrl, router.query.id);
  const { price, ratings, numOfReviews, name, error, description, images, _id } = data || {};

  const { error: orderError, loading, success } = useSelector(state => state.productOrder);

  useEffect(() => {
    if (success) {
      toast.success('Product Added Successfully!');
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (orderError) {
      toast.error(orderError);
    }
    dispatch(clearErrors());
  }, [orderError, error]);

  const handleOrder = useCallback(() => {
    if (!quantity) {
      toast.warning('Please Select Quantity!');
      return;
    }
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

    dispatch(NewProductOrder(order));
  }, [quantity]);

  const handleQuantity = selectedItem => {
    setQuantity(selectedItem);
  };

  if (isLoading) return <Loading square />;

  return (
    <div className="p-product-details">
      <ProductDetails
        loading={loading}
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
