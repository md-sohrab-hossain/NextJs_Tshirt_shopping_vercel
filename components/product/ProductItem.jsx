/** library */
import React from "react";
import Link from "next/link";
/** library */

/** css */
import style from "../../styles/product/product_item.module.scss";
/** css */

function ProductItem({ product }) {
  return (
    <div className={style.product_item}>
      <div className={style.product_item__card}>
        <img
          className={style.product_item__card__img}
          src={product.images[0].url}
          alt={product.name}
        />
        <div className={style.product_item__card__body}>
          <h5 className={style.product_item__card__body__title}>
            <Link href={`/customPages/product/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </h5>

          <div className={style.product_item__details}>
            <p className={style.product_item__details__price}>
              <b>BDT {product.price}</b>/=
            </p>

            <div className={style.ratingOuter}>
              <div
                className={style.ratingInner}
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id={style.review}>({product.numOfReviews} Reviews)</span>
          </div>

          <button className={style.product_item__button}>
            <Link href={`/customPages/product/${product._id}`}>
              View Details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
