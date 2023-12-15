import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import SearchBook from "./SearchBook";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://us-central1-the-final-project-408015.cloudfunctions.net/getAllBooks"
      )
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleBookClick = (bookId) => {
    // Navigate to the book summary or details page
    navigate(`/book-summary/${bookId}`);
  };

  const handleIconClick = (e, bookId, action) => {
    e.stopPropagation();
    // Navigate to the desired page
    if (action === "delete") {
      deleteBook(bookId);
    } else if (action === "edit") {
      navigate(`/update-book/${bookId}`);
    } else if (action === "view") {
      navigate(`/book-summary/${bookId}`);
    }
  };

  const deleteBook = (bookId) => {
    const graphqlQuery = {
      query: `
        mutation {
          deleteBook(id: "${bookId}") {
            id
          }
        }
      `,
    };

    axios
      .post("http://localhost:8080/graphql", graphqlQuery, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        // Remove the book from the list
        setBooks(books.filter((book) => book._id !== bookId));
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const pullSearchResult = (result) => {
    setBooks(result);
  };

  return (
    <div>
      <SearchBook pullSearchResult={pullSearchResult} />
      <div className="book-list">
        {books.map((book) => (
          <div
            className="book-item"
            key={book._id}
            onClick={() => handleBookClick(book._id)}
          >
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <img
              src={book.cover}
              alt={book.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://holyquran.shj.ae/themeasstes/images/no-img.png";
              }}
            />
            <div className="book-item-icons">
              <FaTrash
                onClick={(e) => handleIconClick(e, book._id, "delete")}
              />
              <FaEdit onClick={(e) => handleIconClick(e, book._id, "edit")} />
              <FaEye onClick={(e) => handleIconClick(e, book._id, "view")} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
