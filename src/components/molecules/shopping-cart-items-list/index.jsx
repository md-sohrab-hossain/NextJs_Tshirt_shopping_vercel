import React, { forwardRef } from 'react';
import { mapModifiers } from '../../../libs/component';
import Button from '../../atoms/button';
import ShoppingCartItem from '../../atoms/shopping-cart-item';

const ShoppingCartItemsList = forwardRef(({ products, onClick }, ref) => {
  const componentClassName = mapModifiers('m-shopping-cart-items-list');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className} ref={ref}>
      <div className="m-shopping-cart-items-list__details">
        {products?.orders?.length ? (
          products?.orders.map(item => (
            <ShoppingCartItem
              key={item._id}
              imgUrl={item.images[0].url}
              productName={item.productInfo[0].name}
              price={item.price}
            />
          ))
        ) : (
          <span className="m-shopping-cart-items-list__details--empty"> Your Cart Is Empty!</span>
        )}

        <Button modifiers="indigo" onClick={() => onClick && onClick()}>
          Checkout
        </Button>
      </div>
    </div>
  );
});

export default ShoppingCartItemsList;
ShoppingCartItemsList.displayName = 'shoppingCartItemsList';
