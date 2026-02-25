import { jwtDecode } from "jwt-decode"
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router";

export const checkTokenExpiry = (dispatch, token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      dispatch(logout());
      window.location.assign("/login");
    }
  } catch (err) {
    dispatch(logout());
  }

};