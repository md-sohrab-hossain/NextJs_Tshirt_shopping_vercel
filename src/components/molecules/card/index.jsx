import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { mapModifiers } from '../../../libs/component';
import Button from '../../atoms/button';
import Text from '../../atoms/text';
import Section from '../section';
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

          <div className="m-card__item__details">
            <p className="m-card__item__details--price">BDT {product.price}/=</p>

            <div className="ratingOuter">
              <div className="ratingInner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
            </div>
            <span id="#review">({product.numOfReviews} Reviews)</span>
          </div>
        </>
        <Section padding="vertical-medium">
          <Button modifiers={['violet', 'animated']} onClick={() => router.push(`/customPages/product/${product._id}`)}>
            View Details
          </Button>
        </Section>
      </div>
    </div>
  );
};

export default Card;
