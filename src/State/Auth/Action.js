import axios from "axios";
import * as actionTypes from './ActionTypes';
import api, { API_BASE_URL } from "@/Api/api";

// Funcția de înregistrare
export const register = (userData) => async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });

    const baseUrl = "https://localhost:5455";

    try {
        const response = await axios.post(`${baseUrl}/auth/signup`, userData);
        const user = response.data;
        console.log(user);

        dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);  // Salvează token-ul JWT în localStorage
         //  Navigare către home dacă înregistrarea reușește
    window.location.href = "/"; // alternativ: navigate("/"), dacă îl ai disponibil aici

    } catch (error) {
        dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error.message });
        console.log(error);
    }
};
export const login = (userData) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    console.log("login ", user);

    if (user.twoFactorAuthEnabled) {
      // Navighează la two-factor doar dacă e activat
      return userData.navigate(`/two-factor-auth/${user.session}`);
    }

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      userData.navigate("/");
    }

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user.jwt });
  } catch (error) {
    console.log("catch error", error);
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

// Funcția pentru a obține detaliile utilizatorului
export const getUser = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_REQUEST });

    // Obține token-ul din localStorage
    const jwtToken = localStorage.getItem("jwt");

    // Verifică dacă token-ul există
    if (!jwtToken) {
        dispatch({ type: actionTypes.GET_USER_FAILURE, payload: "Token-ul nu este disponibil!" });
        return;
    }

    console.log("JWT Token trimis:", jwtToken);  // Verifică token-ul înainte de a-l trimite

    const baseUrl = "https://localhost:5455";

    try {
        const response = await axios.get(`${baseUrl}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,  // Trimite token-ul în antet
            },
        });

        const user = response.data;
        console.log(user);

        dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: user });

    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_FAILURE, payload: error.message });
        console.log(error);
    }
};

// Funcția de logout
export const logout = () => (dispatch) => {
    // Șterge token-ul din localStorage
    localStorage.removeItem("jwt");

    // Trimite acțiunea de logout
    dispatch({ type: actionTypes.LOGOUT, payload: null });
};



export const twoStepVerification =
  ({ otp, session, navigate }) =>
  async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_TWO_STEP_REQUEST });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/two-factor/otp/${otp}`,
        {},
        {
          params: { id: session },
        }
      );
      const user = response.data;

      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
        console.log("login ", user);
        navigate("/");
      }
      dispatch({ type: actionTypes.LOGIN_TWO_STEP_SUCCESS, payload: user.jwt });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: actionTypes.LOGIN_TWO_STEP_FAILURE,
        payload: error.response?.data ? error.response.data : error,
      });
    }
  };


  
export const sendVerificationOtp = ({ jwt, verificationType }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEND_VERIFICATION_OTP_REQUEST });
    try {
      const response = await api.post(
  `/api/users/verification/${verificationType}/send-otp`,
  {}, // sau null dacă nu trimiți niciun body
  {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }
);

      const user = response.data;
      dispatch({
        type: actionTypes.SEND_VERIFICATION_OTP_SUCCESS,
        payload: user,
      });
      console.log("send otp ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.SEND_VERIFICATION_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const verifyOtp = ({ jwt, otp }) => {
  console.log("jwt", jwt);
  return async (dispatch) => {
    dispatch({ type: actionTypes.VERIFY_OTP_REQUEST });
    try {
      const response = await api.patch(
  `/api/users/verification/verify-otp/${otp}`,
  {}, // body gol
  {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
);
      const user = response.data;
      dispatch({ type: actionTypes.VERIFY_OTP_SUCCESS, payload: user });
      console.log("verify otp ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({ type: actionTypes.VERIFY_OTP_FAILURE, payload: errorMessage });
    }
  };
};
export const enableTwoStepAuthentication = ({ jwt, otp }) => {
  console.log("jwt", jwt);
  return async (dispatch) => {
    dispatch({ type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_REQUEST });
    try {
      const response = await api.patch(
        `/api/users/enable-two-factor/verify-otp/${otp}`,
        {}, // 👈 body-ul PATCH e gol aici
        {
          headers: {
            Authorization: `Bearer ${jwt}` // ✅ cu Bearer
          },
        }
      );
      const user = response.data;
      dispatch({
        type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
        payload: user,
      });
      console.log("enable two step authentication ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
        payload: errorMessage,
      });
    }
  };
};


export const sendResetPasswordOTP = ({
  sendTo,
  verificationType,
  navigate,
}) => {
  console.log("send otp ", sendTo);
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEND_RESET_PASSWORD_REQUEST });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/users/reset-password/send-otp`,
        {
          sendTo,
          verificationType,
        }
      );
      const user = response.data;
      navigate(`/reset-password/${user.session}`);
      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_SUCCESS,
        payload: user,
      });
      console.log("otp sent successfully ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const verifyResetPasswordOTP = ({
  otp,
  password,
  session,
  navigate,
}) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.VERIFY_RESET_PASSWORD_REQUEST });
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/auth/users/reset-password/verify-otp`,
        {
          otp,
          password,
        },
        {
          params: {
            id: session,
          },
        }
      );
      const user = response.data;
      dispatch({
        type: actionTypes.VERIFY_RESET_PASSWORD_SUCCESS,
        payload: user,
      });
      navigate("/password-update-successfully");
      console.log("VERIFY otp successfully ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.VERIFY_RESET_PASSWORD_FAILURE,
        payload: errorMessage,
      });
    }
  };
};
