import Loading from 'components/atoms/Loading';
import ProductDetails from 'components/organisms/product-details';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getProductDetails } from 'redux/actions/productAction';
import { NewProductOrder } from 'redux/actions/productOrderAction';
function ProductDetailsPage({ props }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

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

  if (!props.product) return <Loading />;

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
      />
    </div>
  );
}

ProductDetailsPage.getInitialProps = async ({ req, query, store }) => {
  await store.dispatch(getProductDetails(req, query?.id));

  const item = store.getState();
  const product = item?.getProductDetails?.product;

  return {
    props: { product },
  };
};

export default ProductDetailsPage;
