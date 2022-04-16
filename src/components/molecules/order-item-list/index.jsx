import Button from 'components/atoms/button';
import OrderItem from 'components/atoms/order-item';
import Text from 'components/atoms/text';
import { mapModifiers } from 'libs/component';
import React from 'react';

const OrderItemList = ({ orders, totalPrice = 0, handleCheckout, handleRemove, handleQuantity }) => {
  const componentClassName = mapModifiers('m-order-item-list');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <div className="m-order-item-list__header">
        <p className="m-order-item-list__header--image">Product</p>
        <p className="m-order-item-list__header--description">Description</p>
        <p className="m-order-item-list__header--quantity">Quantity</p>
        <p className="m-order-item-list__header--price">Price</p>
        <p className="m-order-item-list__header--remove">Remove</p>
      </div>

      <div className="m-order-item-list__details">
        {orders?.map((item, indx) => (
          <OrderItem
            key={indx}
            images={item.images}
            name={item.productInfo[0].name}
            quantity={item.quantity}
            price={item.price}
            productId={item.product}
            paymentInfo={item.paymentInfo}
            handleRemove={handleRemove}
            handleQuantity={handleQuantity}
          />
        ))}
      </div>

      <div className="m-order-item-list__total">
        <Text large>TOTAL: {totalPrice}/= </Text>
      </div>

      {orders?.length > 0 && (
        <div className="m-order-item-list__checkout">
          <Button modifiers="success" onClick={() => handleCheckout(orders[0]?.images[0].url, totalPrice)}>
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderItemList;
