import api from "../../api";
import toastAction from "../../toastAction";
import * as types from "../constants/cart.constant";
const cartActions = {};
cartActions.addToCart = (product) => async (dispatch) => {
  dispatch({ type: types.ADD_TO_CART_REQUEST, payload: null });
  try {
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: product });
    toastAction.success("Added to cart.");
  } catch (err) {
    dispatch({ type: types.ADD_TO_CART_FAILURE, payload: err });
    toastAction.error(err);
  }
};
cartActions.submitOrder = (products, totalAmount) => async (dispatch) => {
  dispatch({ type: types.SUBMIT_ORDER_REQUEST, payload: null });
  try {
    const url = "/order";
    const res = await api.post(url, {
      products: products,
      totalPrice: totalAmount,
    });
    const order = await res.data;
    console.log(order);
    dispatch({ type: types.SUBMIT_ORDER_SUCCESS, payload: order });
    toastAction.success("Ordered Placed Successfully");
  } catch (err) {
    dispatch({ type: types.SUBMIT_ORDER_FAILURE, payload: err });
    toastAction.error(err.response.data);
  }
};
cartActions.removeItem = (productID) => async (dispatch) => {
  dispatch({ type: types.DELETE_CART_ITEM_REQUEST, payload: null });
  try {
    dispatch({ type: types.DELETE_CART_ITEM_SUCCESS, payload: productID });
  } catch (err) {
    dispatch({ type: types.DELETE_CART_ITEM_FAILURE, payload: err });
    toastAction.error(err);
  }
};

cartActions.updateItem = (productID, quantity) => async (dispatch) => {
  dispatch({ type: types.EDIT_CART_REQUEST, payload: null });
  try {
    const data = { productID, quantity };
    dispatch({ type: types.EDIT_CART_SUCCESS, payload: data });
    console.log("Updated");
  } catch (err) {
    dispatch({ type: types.EDIT_CART_FAILURE, payload: err });
    toastAction.error(err);
  }
};
export default cartActions;