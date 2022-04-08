import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/productAction';
import { NewProductOrder } from '../../redux/actions/productOrderAction';
import Loading from '../atoms/Loading';
import style from './productdetails.module.scss';

export default function ProductDetails({ product, title }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  let quantityOptions = [];
  for (let i = 1; i <= 10; i++) quantityOptions.push(i);

  const { price, ratings, numOfReviews, name, error, description, images } = product;

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
      product: product._id,
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

  if (!product) return <Loading />;

  return (
    <>
      <Head>
        <title>{title} - Tshirt-Shopping</title>
      </Head>

      <div className={style.productDetails}>
        <div className={style.productDetails__img}>
          <Carousel>
            {images &&
              images.map((img, indx) => (
                <Carousel.Item key={img.public_id}>
                  <div key={indx} className={style.slider}>
                    <img src={img.url} alt={product?.name} className={style.slider__img} />
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>

        <div className={style.productDetails__info}>
          <div className={style.productDetails__info__card}>
            <h2 className={style.productDetails__info__card__name}>{name}</h2>

            <b> BDT {price}/=</b>

            <div className={style.productDetails__info__card__description}>{description}</div>
            <div className={style.productDetails__info__card__quantity}>
              <span>Quantity:</span>
              <select className="form-control" onChange={e => setQuantity(e.target.value)}>
                {quantityOptions.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.productDetails__info__card__ratings}>
              <div className={style.ratingOuter}>
                <div className={style.ratingInner} style={{ width: `${(ratings / 5) * 100}%` }}></div>
              </div>
              <span id={style.review}>({numOfReviews} Reviews)</span>
            </div>

            <hr />

            <button
              className={
                loading ? style.productDetails__info__card__buttonWait : style.productDetails__info__card__button
              }
              onClick={handleOrder}
            >
              <span> Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
