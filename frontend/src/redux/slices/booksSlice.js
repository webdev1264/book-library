import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "./errorSlice";

const initialState = [];

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/random-book");
      return res.data;
    } catch (e) {
      console.log(e);
      dispatch(setError(e.message));
    }
  }
);

const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action?.payload?.title && action?.payload?.author) {
        const randomBookWithId = createBookWithId(action.payload, "API");
        state.push(randomBookWithId);
      }
    });
  },
});

export const selectBooks = (state) => state.books;

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export default booksSlice.reducer;
