import * as actionTypes from "./actionTypes";

const addBook = (newBook) => {
  return { type: actionTypes.ADD_BOOK, payload: newBook };
};

const deleteBook = (id) => {
  return { type: actionTypes.DELETE_BOOK, payload: id };
};

export { addBook, deleteBook };
