import * as actionTypes from "./actionTypes";

const initialState = [];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK: {
      return [...state, action.payload];
    }
    case actionTypes.DELETE_BOOK: {
      return state.filter((book) => book.id !== action.payload);
    }
    case actionTypes.TOGGLE_FAVORITE: {
      return;
    }
    default: {
      return state;
    }
  }
};

export default booksReducer;
