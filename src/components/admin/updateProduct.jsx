import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getProductDetails, updateProduct } from '../../redux/actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../redux/types/productsType';
import style from './updateProduct.module.scss';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  const { loading, error, isUpdated } = useSelector(state => state.product);

  const { error: productDetailsError, product } = useSelector(state => state.getProductDetails);

  useEffect(() => {
    if (!product || product?._id !== id) {
      dispatch(getProductDetails('', id));
    } else {
      setName(product?.name);
      setPrice(product?.price);
      setDescription(product?.description);
      setOldImages(product?.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (productDetailsError) {
      toast.productDetailsError(productDetailsError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(getProductDetails('', id));
      router.push('/customPages/admin/products');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, productDetailsError, isUpdated, product, id]);

  const submitHandler = e => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      images,
    };

    if (images.length !== 0) productData.images = images;

    dispatch(updateProduct(product._id, productData));
  };

  const onChange = e => {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(oldArray => [...oldArray, reader.result]);
          setImagesPreview(oldArray => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={style.updateNew}>
      <form className={style.updateNew__form} onSubmit={submitHandler} encType="multipart/form-data">
        <h1 className={style.updateNew__form__header}>Update Product</h1>

        <div className={style.updateNew__form__name}>
          <label htmlFor="name_field">Name</label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            value={name || ''}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className={style.updateNew__form__price}>
          <label htmlFor="price_field">Price</label>
          <input
            type="text"
            id="price_field"
            className="form-control"
            value={price || ''}
            placeholder={price ? '' : '0'}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <div className={style.updateNew__form__description}>
          <label htmlFor="description_field">Description</label>
          <textarea
            className="form-control"
            id="description_field"
            rows="2"
            value={description || ''}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={style.updateNew__form__image}>
          <label>Images</label>
          <div className="custom-file">
            <input
              type="file"
              name="room_images"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
              multiple
            />
            <label className="custom-file-label" htmlFor="customFile">
              Choose Images
            </label>
          </div>

          <div className={style.updateNew__form__image__preview}>
            {imagesPreview &&
              imagesPreview.map(img => (
                <img src={img} key={img} alt="Images Preview" className={style.updateNew__form__image__preview__size} />
              ))}

            {oldImages &&
              oldImages.map(img => (
                <img
                  src={img.url}
                  key={img.public_id}
                  alt="Images Preview"
                  className={style.updateNew__form__image__preview__size}
                />
              ))}
          </div>
        </div>

        <button
          type="submit"
          className={loading ? style.button__wait : style.button__update}
          disabled={loading ? true : false}
        >
          <span>Update</span>
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
