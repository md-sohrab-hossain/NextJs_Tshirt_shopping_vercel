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
        <div className={style.productDetails__img}>
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
        </div>

        <div className={style.productDetails__info}>
          <div className={style.productDetails__info__card}>
            <h2 className={style.productDetails__info__card__name}>
              {product?.name}
            </h2>

            <b> BDT {product?.price}/=</b>

            <div className={style.productDetails__info__card__description}>
              {product?.description}
            </div>
            <div className={style.productDetails__info__card__ratings}>
              <div className={style.ratingOuter}>
                <div
                  className={style.ratingInner}
                  style={{ width: `${(product?.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id={style.review}>({product?.numOfReviews} Reviews)</span>
            </div>

            <hr />

            <button className={style.productDetails__info__card__button}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
