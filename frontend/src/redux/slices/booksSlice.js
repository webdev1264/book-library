import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "./errorSlice";

const initialState = [];

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      console.log(e);
      thunkAPI.dispatch(setError(e.message));
      throw e; // to avoid calling reducer function as using try/catch syntax, the promise will be fulfilled
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
