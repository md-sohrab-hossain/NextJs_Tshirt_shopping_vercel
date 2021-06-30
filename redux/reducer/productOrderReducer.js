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
  CLEAR_CART_ITEM,
  CLEAR_ERRORS,
} from "../types/productOrderType";

export const productOrderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM_REQUEST:
      return {
        loading: true,
      };
    case ADD_ITEM_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case ADD_ITEM_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ADD_ITEM_RESET:
      return {
        loading: false,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getMyOrdersReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ITEM_REQUEST:
      return {
        loading: true,
      };
    case GET_ITEM_SUCCESS:
      return {
        success: true,
        loading: false,
        order: payload,
      };
    case GET_ITEM_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
