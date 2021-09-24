import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  CLEAR_ERROR,
} from "../types/productsType";

//! 👇 Get all products
export const getAllProducts =
  (req, currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      const { origin } = absoluteUrl(req);
      let link = `${origin}/api/user/products?page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//! 👇 Get all Products - ADMIN
export const getAdminProducts =
  (req, currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCTS_REQUEST });

      const { origin } = absoluteUrl(req);
      let link = `${origin}/api/admin/products?page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ADMIN_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//!👇 get Product details
export const getProductDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/user/products/${id}`);

    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//!👇 create new product
export const createNewProduct = (ProductData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/products`,
      ProductData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/user/products/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/user/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//*💣💣 Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
function req(req) {
  throw new Error("Function not implemented.");
}
