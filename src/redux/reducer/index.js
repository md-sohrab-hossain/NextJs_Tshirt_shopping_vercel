import { combineReducers } from 'redux';

import {
  authReducer,
  userReducer,
  loadedUserReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from './userReducer';

import {
  productReducer,
  getAllproductsReducer,
  getAllproductsAdminReducer,
  productDetailsReducer,
  createNewProductReducer,
  updateProductReducer,
} from './productReducer';

import { productOrderReducer, getMyOrdersReducer, removeSingleItemReducer } from './productOrderReducer';

const reducer = combineReducers({
  //*-- user --//
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  //*-- user --//

  //*-- product --//
  product: productReducer,
  createNewProduct: createNewProductReducer,
  getAllProducts: getAllproductsReducer,
  getAllProductsAdmin: getAllproductsAdminReducer,
  getProductDetails: productDetailsReducer,
  updateProduct: updateProductReducer,
  //*-- product --//

  //*-- product order --//
  productOrder: productOrderReducer,
  getMyOrderList: getMyOrdersReducer,
  removeItem: removeSingleItemReducer,
  //*-- product order --//
});

export default reducer;
