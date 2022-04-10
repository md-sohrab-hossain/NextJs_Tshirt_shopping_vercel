import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { mapModifiers } from '../../../libs/component';
import Button from '../../atoms/button';
import Rating from '../../atoms/rating';
import Text from '../../atoms/text';
import NotFoundImage from '/public/static/images/not-found.png';

const Card = ({ product }) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(product.images[0].url);
  const componentClassName = mapModifiers('m-card');
  const className = `${componentClassName}`.trim();

  const handleOnError = useCallback(() => {
    setImgSrc(NotFoundImage);
  }, []);

  return (
    <div className={className}>
      <div className="m-card__item">
        <div className="m-card__item--image">
          <Image draggable="false" onError={handleOnError} src={imgSrc} alt="card img" layout="fill" />
        </div>

        <>
          <Text size="large">
            <Link href={`/customPages/product/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </Text>

          <div className="m-card__item--details">
            <div className="m-card__item--details-price">BDT {product.price}/=</div>
            <div className="m-card__item--details-rating">
              <Rating ratings={product.ratings} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>
          </div>
        </>

        <Button modifiers={['violet', 'animated']} onClick={() => router.push(`/customPages/product/${product._id}`)}>
          View Details
        </Button>
      </div>
    </div>
  );
};

export default Card;
