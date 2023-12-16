import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookSummary() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://rest-api-gateway-13rg1aac.ew.gateway.dev/getBook/?id=${bookId}`
      )
      .then((response) => {
        setBook(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [bookId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading book.</div>;
  if (!book) return <div>No book found.</div>;

  return (
    <div className="book-summary">
      <h1>{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <img src={book.cover} alt={book.title} />
      <p>{book.summary}</p>
    </div>
  );
}
