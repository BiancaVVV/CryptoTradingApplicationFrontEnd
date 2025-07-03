import * as actionTypes from "./ActionTypes";
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.REGISTER_REQUEST:
      case actionTypes.LOGIN_REQUEST:
      case actionTypes.GET_USER_REQUEST:
        return { ...state, loading: true, error: null };
  
      case actionTypes.REGISTER_SUCCESS:
        return { ...state, loading: false, jwt:action.payload };
  
      case actionTypes.LOGIN_SUCCESS:
        return { ...state, loading: false, jwt: action.payload };
  
        case actionTypes.LOGIN_TWO_STEP_SUCCESS:
        return { ...state, loading: false, jwt: action.payload };
  
      case actionTypes.GET_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          fetchingUser: false,
          
        };
  
      case actionTypes.LOGIN_FAILURE:
      case actionTypes.REGISTER_FAILURE:
      case actionTypes.GET_USER_FAILURE:
      case actionTypes.LOGIN_TWO_STEP_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case actionTypes.LOGOUT:
        localStorage.removeItem("jwt");
        return { ...state, jwt: null, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  