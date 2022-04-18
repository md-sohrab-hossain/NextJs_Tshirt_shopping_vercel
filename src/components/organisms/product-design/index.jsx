import Heading from 'components/atoms/heading';
import { mapModifiers } from 'libs/component';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
const DynamicCustomImageEditor = dynamic(() => import('components/molecules/image-editor'), { ssr: false });

const ProductDesign = () => {
  const componentClassName = mapModifiers('o-product-design');
  const className = `${componentClassName}`.trim();

  return (
    <>
      <Head>
        <title>Tshirt-Design</title>
      </Head>
      <div className={className}>
        <div className="o-product-design__img-preview">
          <DynamicCustomImageEditor />
        </div>
        <div className="o-product-design__info">
          <Heading>Your Choice</Heading>
          <Heading tag="h4">BDT 1000 /=</Heading>
        </div>
      </div>
    </>
  );
};

export default ProductDesign;
