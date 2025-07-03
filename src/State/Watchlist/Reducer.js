import * as types from "./ActionTypes";
import { existInWatchlist } from "@/Util/existInWatchlist";

// Încercăm să preluăm datele din localStorage
const localItems = JSON.parse(localStorage.getItem("watchlist_items")) || [];

const initialState = {
  watchlist: null,
  loading: false,
  error: null,
  items: localItems,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_WATCHLIST_REQUEST:
    case types.ADD_COIN_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_USER_WATCHLIST_SUCCESS: {
      const items = action.payload.coins;
      localStorage.setItem("watchlist_items", JSON.stringify(items));
      return {
        ...state,
        watchlist: action.payload,
        items,
        loading: false,
        error: null,
      };
    }

    case types.ADD_COIN_TO_WATCHLIST_SUCCESS: {
      const updatedItems = existInWatchlist(state.items, action.payload)
        ? state.items.filter((item) => item.id !== action.payload.id)
        : [action.payload, ...state.items];
      localStorage.setItem("watchlist_items", JSON.stringify(updatedItems));
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null,
      };
    }

    case types.GET_USER_WATCHLIST_FAILURE:
    case types.ADD_COIN_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default watchlistReducer;
