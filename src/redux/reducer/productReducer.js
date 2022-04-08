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
} from '../types/productsType';

const initialState = {
  productsCount: 0,
  resultPerPage: 0,
  filteredProductCount: 0,
  products: [],
};

//! 👇 get all products
export const getAllproductsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        productsCount: payload.productsCount,
        resultPerPage: payload.resultPerPage,
        filteredProductCount: payload.filteredProductCount,
        products: payload.products,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        error: payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//! 👇 get all products Admin
export const getAllproductsAdminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        productsCount: payload.productsCount,
        resultPerPage: payload.resultPerPage,
        filteredProductCount: payload.filteredProductCount,
        products: payload.products,
      };

    case ADMIN_PRODUCTS_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//! 👇 Product details reducer
export const productDetailsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        product: payload,
      };
    case PRODUCTS_DETAILS_FAIL:
      return {
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//! 👇 create new Product reducer
export const createNewProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case NEW_PRODUCT_RESET:
      return {
        success: false,
      };

    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//! 👇 update Product reducer
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        isUpdated: false,
      };

    case DELETE_PRODUCT_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        isUpdated: false,
      };

    case DELETE_PRODUCT_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
