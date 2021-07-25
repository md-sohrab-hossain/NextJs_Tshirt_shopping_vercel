import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  createNewProduct,
  clearErrors,
} from "../../redux/actions/productAction";

import { NEW_PRODUCT_RESET } from "../../redux/types/productsType";

import style from "./createNewProduct.module.scss";

const createnewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success } = useSelector(
    (state) => state.createNewProduct
  );

  const { user } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created successfully!");
      router.push("/customPages/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      images,
      user,
    };

    if (images.length === 0) return toast.error("Please upload images.");

    dispatch(createNewProduct(productData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={style.createnew}>
      <form
        className={style.createnew__form}
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <h1 className={style.createnew__form__header}>New Product</h1>

        <div className={style.createnew__form__name}>
          <label htmlFor="name_field">Name</label>
          <input
            required
            type="text"
            id="name_field"
            className="form-control"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={style.createnew__form__price}>
          <label htmlFor="price_field">Price</label>
          <input
            required
            type="number"
            id="price_field"
            className="form-control"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className={style.createnew__form__description}>
          <label htmlFor="description_field">Description</label>
          <textarea
            required
            className="form-control"
            id="description_field"
            rows="2"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className={style.createnew__form__image}>
          <label>Images</label>
          <div className="custom-file">
            <input
              required
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

          <div className={style.createnew__form__image__preview}>
            {imagesPreview.map((img) => (
              <img
                src={img}
                key={img}
                alt="Images Preview"
                className={style.createnew__form__image__preview__size}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={loading ? style.button__wait : style.button__create}
          disabled={loading ? true : false}
        >
          <span>Create</span>
        </button>
      </form>
    </div>
  );
};

export default createnewProduct;
