import ProductDesign from 'components/organisms/product-design';
import { QUANTITY, SIZE } from 'constants/options';
import React, { useState } from 'react';
const defaultImg =
  'https://res.cloudinary.com/sajal-cnq/image/upload/v1624538021/tshirt/products/ezafikjm5prqocue1fgl.png';

const ProductDesignPage = () => {
  const [imgSrc, setImgSrc] = useState(defaultImg);

  const handleQuantity = quantity => {
    console.log('quantity-- ', quantity);
  };

  const handleSize = size => {
    console.log('size-- ', size);
  };

  const handleOrder = () => {};

  return (
    <div className="p-product-design">
      <ProductDesign
        loading={false}
        size={SIZE}
        quantity={QUANTITY}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        handleQuantity={handleQuantity}
        handleSize={handleSize}
        handleOrder={handleOrder}
      />
    </div>
  );
};

export default ProductDesignPage;
