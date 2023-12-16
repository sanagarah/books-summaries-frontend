import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    cover: "",
    summary: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-the-final-project-408015.cloudfunctions.net/getBook?id=${bookId}`
      )
      .then((response) => {
        setBookDetails(response.data);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://books-backend-m4slaxoduq-uc.a.run.app/api/books/?id=${bookId}`,
        bookDetails
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  const handleChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="book-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={bookDetails.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <label htmlFor="author">author</label>
        <input
          name="author"
          value={bookDetails.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <label htmlFor="cover">cover</label>
        <input
          name="cover"
          value={bookDetails.cover}
          onChange={handleChange}
          placeholder="Cover URL"
        />
        <label htmlFor="summary">summary</label>
        <textarea
          name="summary"
          value={bookDetails.summary}
          onChange={handleChange}
          placeholder="Summary"
        />
        <button type="submit">Update Book</button>
      </f