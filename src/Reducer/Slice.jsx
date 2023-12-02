import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "Books list",
  initialState: {
    author: {
      books: [

      ],
    },
  },
  reducers: {
    setBook: (state, action) => {
      state.author.books = action.payload;
      return state;
    },
    editBook: (state, action) => {
      const id = action.payload;
      state.author.books = state.author.books.filter(
        (details) => details.id !== id
      );
    },
    deleteBook: (state, action) => {
      const id = action.payload;
      state.author.books = state.author.books.filter(
        (details) => details.id !== id
      );
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
});
export const { setBook, editBook, deleteBook } = bookSlice.actions;
