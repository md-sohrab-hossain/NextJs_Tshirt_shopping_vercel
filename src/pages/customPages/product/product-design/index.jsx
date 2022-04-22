import ProductDesign from 'components/organisms/product-design';
import { QUANTITY, SIZE } from 'constants/options';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const defaultImg = '/images/white_tshirt.png';

const ProductDesignPage = () => {
  const [imgSrc, setImgSrc] = useState(defaultImg);

  const handleSize = size => {};
  const handleQuantity = quantity => {};

  const handleOrder = () => {
    return toast.warning('This feature is under development!');
  };

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
