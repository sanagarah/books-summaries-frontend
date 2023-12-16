import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddBook() {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    cover: "",
    summary: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://books-backend-m4slaxoduq-uc.a.run.app/api/books",
        bookDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        toast.success("Book added successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error adding book");
        console.error("Error adding book", error);
      });
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
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
