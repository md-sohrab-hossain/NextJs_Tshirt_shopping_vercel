import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import Rating from 'components/atoms/rating';
import Dropdown from 'components/atoms/react-select';
import Text from 'components/atoms/text';
import Carousel from 'components/molecules/carousel';
import { mapModifiers } from 'libs/component';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { SwiperSlide } from 'swiper/react';

const ProductDetails = ({
  loading,
  quantity,
  title,
  images,
  brandName,
  price,
  rating,
  reviews = 0,
  description,
  onClick,
  handleQuantity,
}) => {
  const componentClassName = mapModifiers('o-product-details');
  const className = `${componentClassName}`.trim();

  return (
    <>
      <Head>
        <title>{title} - Tshirt-Shopping</title>
      </Head>

      <div className={className}>
        <div className="o-product-details__img-preview">
          <Carousel>
            {images?.map(img => (
              <SwiperSlide key={img.public_id}>
                <Image draggable="false" src={img.url} alt="slider img" height="200" width="250" />
              </SwiperSlide>
            ))}
          </Carousel>
        </div>

        <div className="o-product-details__info">
          <Heading>{brandName}</Heading>
          <Heading tag="h4">BDT {price} /=</Heading>

          <Text>{description}</Text>

          <div className="o-product-details__info--quantity">
            <span>Quantity:</span>
            <Dropdown options={quantity} onChange={option => handleQuantity && handleQuantity(option.value)} />
          </div>

          <div className="o-product-details__info--rating">
            <Rating ratings={rating} />
            <span>({reviews}) reviews</span>
          </div>

          <hr />

          <Button modifiers={loading ? 'loading' : 'success'} disabled={loading ? true : false} onClick={onClick}>
            <span>Add To Cart</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
