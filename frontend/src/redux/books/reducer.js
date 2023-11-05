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
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );
    }
    case "FILTER_BOOKS": {
      return state.filter((book) =>
        book.title.includes(action.payload) ? book : null
      );
    }
    default: {
      return state;
    }
  }
};

export default booksReducer;
