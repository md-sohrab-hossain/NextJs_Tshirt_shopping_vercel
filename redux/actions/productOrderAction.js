import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  ADD_ITEM_RESET,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAIL,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_RESET,
  REMOVE_ITEM_FAIL,
  CLEAR_ERRORS,
} from "../types/productOrderType";

import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const NewProductOrder = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ITEM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/productOrder", productData, config);

    dispatch({
      type: ADD_ITEM_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

//! 👇 Get all orders current user
export const getMyOrders = (req) => async (dispatch) => {
  try {
    dispatch({ type: GET_ITEM_REQUEST });

    const { origin } = absoluteUrl(req);
    let link = `${origin}/api/productOrder/myOrder`;

    const { data } = await axios.get(link);

    dispatch({
      type: GET_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

//! 👇 remove single item
export const removeItems = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_ITEM_REQUEST });

    const { data } = await axios.delete(`/api/productOrder/myOrder/${id}`);

    dispatch({
      type: REMOVE_ITEM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

//*💣💣 Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
function req(req) {
  throw new Error("Function not implemented.");
}
