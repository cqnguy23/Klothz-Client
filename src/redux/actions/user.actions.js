import * as types from "../constants/user.constant.js";
import api from "../../api";
import toastAction from "../../toastAction";
const userActions = {};

userActions.login =
  (email, password, setIsLogInModalVisible, isAdmin) => async (dispatch) => {
    dispatch({ type: types.USER_LOGIN_REQUEST, payload: null });
    try {
      let url = "/auth/login";
      if (isAdmin) url = "/auth/admin/login";
      const resp = await api.post(url, {
        email,
        password,
      });
      let user = await resp.data.user;
      const accessToken = await resp.data.accessToken;
      user.accessToken = await accessToken;
      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: user });
      api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
      toastAction.success("Login Success!");
      if (setIsLogInModalVisible) setIsLogInModalVisible(false);
    } catch (err) {
      console.log({ err });
      dispatch({ type: types.USER_LOGIN_FAILURE, payload: null });
      toastAction.error(err.response?.data);
    }
  };

userActions.resgister =
  (email, password, name, setIsRegisterModalVisible) => async (dispatch) => {
    dispatch({ type: types.USER_REGISTER_REQUEST, payload: null });
    try {
      let url = "/auth/register";
      const resp = await api.post(url, {
        email,
        password,
        name,
      });
      const user = await resp.data.user;
      const accessToken = await resp.data.accessToken;
      dispatch({ type: types.USER_REGISTER_SUCCESS, payload: user });
      api.defaults.headers.common["authorization"] = "Bearer " + accessToken;

      toastAction.success("Registration Success!");

      setIsRegisterModalVisible(false);
    } catch (err) {
      dispatch({ type: types.USER_REGISTER_FAILURE, payload: err });
      toastAction.error("Registration Failed!");
    }
  };
userActions.getUserOrders = () => async (dispatch) => {
  dispatch({ type: types.USER_GET_ORDER_REQUEST, payload: null });
  try {
    let url = "/order/user";
    const resp = await api.get(url);
    const orders = await resp.data;
    dispatch({ type: types.USER_GET_ORDER_SUCCESS, payload: orders });
    // toastAction.success("Registration Success!");
  } catch (err) {
    dispatch({ type: types.USER_GET_ORDER_FAILURE, payload: err });
    toastAction.error("Get Orders Failed!");
  }
};
userActions.cancelOrder = (orderID) => async (dispatch) => {
  dispatch({ type: types.USER_CANCEL_ORDER_REQUEST, payload: null });
  try {
    let url = "/order/cancellation/" + orderID;
    const resp = await api.patch(url);
    const orders = await resp.data;
    dispatch({ type: types.USER_CANCEL_ORDER_SUCCESS, payload: orders });
    // toastAction.success("Registration Success!");

    // console.log(user);
  } catch (err) {
    dispatch({ type: types.USER_CANCEL_ORDER_FAILURE, payload: err });
    console.log({ err });
    toastAction.error("Get Orders Failed!");
  }
};

userActions.logout = () => async (dispatch) => {
  dispatch({ type: types.USER_LOGOUT_REQUEST, payload: null });

  try {
    const token = api.defaults.headers.common["authorization"].replace(
      "Bearer ",
      ""
    );
    const url = "/auth/logout";
    const resp = await api.post(url, {
      token,
    });
    console.log(resp);
    delete api.defaults.headers.common["authorization"];

    dispatch({ type: types.USER_LOGOUT_SUCCESS, payload: null });
    toastAction.success("Log out successfully!");
  } catch (err) {
    dispatch({ type: types.USER_LOGOUT_FAILURE, payload: err });
  }
};
export default userActions;
