import Icon from 'components/atoms/icon';
import Text from 'components/atoms/text';
import { mapModifiers } from 'libs/component';
import Image from 'next/image';
import React from 'react';

const OrderItem = ({ images, name, quantity, price, productId, paymentInfo, handleQuantity, handleRemove }) => {
  const componentClassName = mapModifiers('a-order-item');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <div className="a-order-item__image">
        <Image draggable="false" src={images[0]?.url} alt="order img" layout="fill" />
      </div>

      <div className="a-order-item__name">
        <Text>{name}</Text>
      </div>

      <div className="a-order-item__quantity">
        <Icon
          name="arrow-left-gray-active"
          onClick={() => {
            quantity === 1
              ? handleRemove && handleRemove(productId)
              : handleQuantity && handleQuantity(-1, productId, price, images, paymentInfo);
          }}
        />
        <Text>{quantity}</Text>
        <Icon
          name="arrow-right-gray-active"
          onClick={() => handleQuantity && handleQuantity(1, productId, price, images, paymentInfo)}
        />
      </div>

      <div className="a-order-item__price">
        <Text>{price * quantity}/=</Text>
      </div>

      <div className="a-order-item__remove">
        <Icon name="close" onClick={() => handleRemove && handleRemove(productId)} />
      </div>
    </div>
  );
};

export default OrderItem;
