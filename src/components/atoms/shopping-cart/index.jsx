import React from 'react';
import { mapModifiers } from '../../../libs/component';
import Icon from '../icon';

const ShoppingCart = ({ onClick, products }) => {
  const componentClassName = mapModifiers('a-shopping-cart');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className} onClick={onClick}>
      <Icon name="shopping-bag" />
      <span className="a-shopping-cart__count">{products?.orders.length || 0}</span>
    </div>
  );
};

export default ShoppingCart;
