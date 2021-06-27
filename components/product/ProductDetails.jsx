import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/productAction";
import { Carousel } from "react-bootstrap";

import Loading from "../atoms/Loading";
import style from "../../styles/product/product_details.module.scss";

export default function ProductDetails({ product, title }) {
  const dispatch = useDispatch();

  const {
    price,
    ratings,
    numOfReviews,
    name,
    error,
    description,
    reviews,
    images,
  } = product;

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, []);

  if (!product) return <Loading />;

  return (
    <>
      <Head>
        <title>{title} - Tshirt-Design</title>
      </Head>

      <div className={style.productDetails}>
        <Carousel>
          {images &&
            images.map((img, indx) => (
              <Carousel.Item key={img.public_id}>
                <div key={indx} className={style.slider}>
                  <img
                    src={img.url}
                    alt={product?.name}
                    className={style.slider__img}
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <h2 className={style.productDetails__name}>{product?.name}</h2>

        <div className={style.productDetails__ratings}>
          <div className={style.ratingOuter}>
            <div
              className={style.ratingInner}
              style={{ width: `${(product?.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id={style.review}>({product?.numOfReviews} Reviews)</span>
        </div>

        <div className={style.roomDetails__description}>
          <div className={style.roomDetails__description__feature}>
            <h3>Description</h3>
            <p>{product?.description}</p>
          </div>

          <div className={style.roomDetails__description__card}>
            <div className={style.roomDetails__description__card__price}>
              <p className={style.roomDetails__description__card__price__text}>
                <b>${product?.price}</b>
              </p>

              <hr />
              <p className={style.roomDetails__description__card__price__info}>
                Pick Check In & Check Out Date
              </p>

              <button className={style.roomDetails__description__card__button}>
                Pay
              </button>
            </div>
          </div>
        </div>

        <div className={style.review}>
          <h3>Reviews:</h3>
          <hr />
          <div>
            <p className={style.review__user}>by John</p>
            <p>Good Quality</p>
            <hr />
          </div>

          <div>
            <p className={style.review__user}>by John</p>
            <p>Good Quality</p>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
