import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addBook } from "../../redux/slices/booksSlice";
import booksData from "../../data/book.json";
import createBookWithId from "../../utils/createBookWithId";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = createBookWithId({ title, author });
      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = createBookWithId(randomBook);
    dispatch(addBook(randomBookWithId));
  };

  const handleAddRandomBookViaApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/random-book");
      if (res?.data?.title && res?.data?.author) {
        const randomBookWithId = createBookWithId(res.data);
        dispatch(addBook(randomBookWithId));
      }
    } catch (e) {
      console.log("Error fetching random book", e.message);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add random
        </button>
        <button type="button" onClick={handleAddRandomBookViaApi}>
          Add random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
