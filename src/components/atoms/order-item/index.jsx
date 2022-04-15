import Icon from 'components/atoms/icon';
import Text from 'components/atoms/text';
import { mapModifiers } from 'libs/component';
import Image from 'next/image';
import React from 'react';

const OrderItem = ({ imgUrl, name, quantity, price, handleQuantity, handleRemove }) => {
  const componentClassName = mapModifiers('a-order-item');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <div className="a-order-item__image">
        <Image draggable="false" src={imgUrl} alt="order img" layout="fill" />
      </div>

      <div className="a-order-item__name">
        <Text>{name}</Text>
      </div>

      <div className="a-order-item__quantity">
        <Icon
          name="arrow-left-gray-active"
          onClick={() => {
            quantity === 1 ? handleRemove && handleRemove() : handleQuantity && handleQuantity(-1);
          }}
        />
        <Text>{quantity}</Text>
        <Icon name="arrow-right-gray-active" onClick={() => handleQuantity && handleQuantity(1)} />
      </div>

      <div className="a-order-item__price">
        <Text>{price}/=</Text>
      </div>

      <div className="a-order-item__remove">
        <Icon name="close" onClick={() => handleRemove && handleRemove()} />
      </div>
    </div>
  );
};

export default OrderItem;
