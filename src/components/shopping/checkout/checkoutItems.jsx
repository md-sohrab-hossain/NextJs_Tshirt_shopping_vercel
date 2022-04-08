import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NewProductOrder, removeItems } from '../../../redux/actions/productOrderAction';
import DeleteModal from '../../atoms/DeleteModal';

const CheckoutItem = ({ cartItem }) => {
  const [openModal, setOpenModal] = useState({
    id: null,
    open: false,
  });

  const dispatch = useDispatch();
  const { images, totalPrice, productInfo, paymentInfo, product, price, quantity } = cartItem;

  const handleQuantity = useCallback(value => {
    const order = {
      product,
      quantity: value,
      price,
      images,
      paymentInfo,
    };
    dispatch(NewProductOrder(order));
  }, []);

  const handleRemove = useCallback((id, Delete) => {
    if (Delete) dispatch(removeItems(id));
    setOpenModal({ open: false, id: id });
  }, []);

  return (
    <>
      <div className="checkout">
        <div className="checkout__image">
          <img src={images[0].url} alt="item" />
        </div>

        <span className="checkout__name">{productInfo[0].name}</span>
        <span className="checkout__quantity">
          <div
            className="checkout__arrow"
            onClick={() => {
              quantity === 1 ? handleRemove(product, true) : handleQuantity(-1);
            }}
          >
            &#10094;
          </div>
          <span className="checkout__value">{quantity}</span>
          <div className="checkout__arrow" onClick={() => handleQuantity(1)}>
            &#10095;
          </div>
        </span>
        <span className="checkout__price">{totalPrice}/=</span>
        <div className="checkout__removeButton" onClick={() => setOpenModal({ id: product, open: true })}>
          &#10005;
        </div>
      </div>

      <DeleteModal message="Do you want to remove this item?" handleOpen={openModal} handleDelete={handleRemove} />
    </>
  );
};

export default CheckoutItem;
