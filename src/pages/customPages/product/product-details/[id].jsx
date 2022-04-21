import Loading from 'components/atoms/loading';
import ProductDetails from 'components/organisms/product-details';
import { QUANTITY } from 'constants/options';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getProductDetails } from 'redux/actions/productAction';
import { NewProductOrder } from 'redux/actions/productOrderAction';

const ProductDetailsPage = ({ props }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(null);
  const { price, ratings, numOfReviews, name, error, description, images, _id } = props.product;

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

  if (!props.product) return <Loading square />;

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

ProductDetailsPage.getInitialProps = async ({ req, query, store }) => {
  await store.dispatch(getProductDetails(req, query?.id));

  const item = store.getState();
  const product = item?.getProductDetails?.product;

  return {
    props: { product },
  };
};

export default ProductDetailsPage;
