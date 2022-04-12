import { mapModifiers } from 'libs/component';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import NotFoundImage from '/public/static/images/not-found.png';

const ShoppingCartItem = ({ imgUrl, productName, price }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const componentClassName = mapModifiers('a-shopping-cart-item');
  const className = `${componentClassName}`.trim();

  const handleOnError = useCallback(() => {
    setImgSrc(NotFoundImage);
  }, []);

  return (
    <div className={className}>
      <div className="a-shopping-cart-item__image">
        <Image draggable="false" onError={handleOnError} src={imgSrc} alt="product-img" layout="fill" />
      </div>
      <span className="a-shopping-cart-item__name">{productName}</span>
      <span className="a-shopping-cart-item__price">{price} /=</span>
    </div>
  );
};

export default ShoppingCartItem;
