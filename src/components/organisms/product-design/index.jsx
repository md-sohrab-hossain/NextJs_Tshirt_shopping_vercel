import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import Dropdown from 'components/atoms/react-select';
import { mapModifiers } from 'libs/component';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';

const DynamicCustomImageEditor = dynamic(() => import('components/molecules/image-editor'), { ssr: false });
const defaultImg =
  'https://next-js-tshirt-shopping.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538021%2Ftshirt%2Fproducts%2Fezafikjm5prqocue1fgl.png&w=1920&q=75';

const ProductDesign = ({ loading, quantity, size, onClick, onChange }) => {
  const [imgSrc, setImgSrc] = useState(defaultImg);
  const componentClassName = mapModifiers('o-product-design');
  const className = `${componentClassName}`.trim();

  return (
    <>
      <Head>
        <title>Tshirt-Design</title>
      </Head>
      <div className={className}>
        <div className="o-product-design__img-preview">
          <DynamicCustomImageEditor setImgSrc={setImgSrc} />
        </div>
        <div className="o-product-design__info">
          <Heading>Your Choice</Heading>
          <Heading tag="h4">BDT 1000 /=</Heading>
          <Image draggable="false" src={imgSrc} alt="avata img" height="180" width="180" />

          <div className="o-product-design__info--quantity">
            <span className="o-product-design__info--quantity-text">Quantity:</span>
            <Dropdown options={quantity} onChange={option => onChange && onChange(option.value)} />
          </div>

          <div className="o-product-design__info--size">
            <span className="o-product-design__info--size-text">Size:</span>
            <Dropdown options={size} onChange={option => onChange && onChange(option.value)} />
          </div>

          <Button modifiers={loading ? 'loading' : 'success'} disabled={loading ? true : false} onClick={onClick}>
            <span>Order</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDesign;
