import { loginFailure,
  loginStart,
  loginSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure, } from "./userRedux";
  import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch,user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register",user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
//update user
export const updateUser = async (id,user,dispatch) => {
  dispatch(updateUserStart());
  console.log({id}) ;
  try {
    // update
    const res = await userRequest.put(`/users/${id}`,user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

