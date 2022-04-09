import Button from 'components/atoms/button';
import Section from 'components/molecules/section';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function ProductItem({ product }) {
  const router = useRouter();

  return (
    <div className="product_item">
      <div className="product_item__card">
        <img className="product_item__card__img" src={product.images[0].url} alt={product.name} />
        <div className="product_item__card__body">
          <h5 className="product_item__card__body__title">
            <Link href={`/customPages/product/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </h5>

          <div className="product_item__details">
            <p className="product_item__details__price">
              <b>BDT {product.price}</b>/=
            </p>

            <div className="ratingOuter">
              <div className="ratingInner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
            </div>
            <span id="#review">({product.numOfReviews} Reviews)</span>
          </div>

          <Section padding="vertical-medium">
            <Button
              modifiers={['violet', 'animated']}
              onClick={() => router.push(`/customPages/product/${product._id}`)}
            >
              View Details
            </Button>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
