import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "./errorSlice";

const initialState = { books: [], isLoadingViaAPI: false };

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setError(error.message));
      //Option 1
      return thunkAPI.rejectWithValue(error);
      // //Option 2
      // throw error; // to avoid calling reducer function as using try/catch syntax, the promise will be fulfilled
    }
  }
);

const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      const books = state.books.filter((book) => book.id !== action.payload);
      return { ...state, books };
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  // Option 1
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload?.title && action?.payload?.author) {
        const randomBookWithId = createBookWithId(action.payload, "API");
        state.books.push(randomBookWithId);
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  },
  // // Option 2
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.pending, (state) => {
  //     state.isLoadingViaAPI = true;
  //   });
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     state.isLoadingViaAPI = false;
  //     if (action?.payload?.title && action?.payload?.author) {
  //       const randomBookWithId = createBookWithId(action.payload, "API");
  //       state.books.push(randomBookWithId);
  //     }
  //   });
  //   builder.addCase(fetchBook.rejected, (state) => {
  //     state.isLoadingViaAPI = false;
  //   });
  // },
});

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export default booksSlice.reducer;
