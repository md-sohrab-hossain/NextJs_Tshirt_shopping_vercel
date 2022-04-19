import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import Dropdown from 'components/atoms/react-select';
import { mapModifiers } from 'libs/component';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const DynamicCustomImageEditor = dynamic(() => import('components/molecules/image-editor'), { ssr: false });

const ProductDesign = ({ imgSrc, setImgSrc, loading, quantity, size, handleOrder, handleQuantity, handleSize }) => {
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
          <Image draggable="false" src={imgSrc} alt="avata img" height="180" width="180" />
          <Heading tag="h3">BDT 1000 /=</Heading>

          <div className="o-product-design__info--quantity">
            <span className="o-product-design__info--quantity-text">Quantity:</span>
            <Dropdown options={quantity} onChange={option => handleQuantity && handleQuantity(option.value)} />
          </div>

          <div className="o-product-design__info--size">
            <span className="o-product-design__info--size-text">Size:</span>
            <Dropdown options={size} onChange={option => handleSize && handleSize(option.value)} />
          </div>

          <hr />

          <Button modifiers={loading ? 'loading' : 'success'} disabled={loading ? true : false} onClick={handleOrder}>
            <span>Order</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDesign;
