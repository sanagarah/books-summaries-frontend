import { useState } from "react";
import axios from "axios";

export default function SearchBook({ pullSearchResult }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const graphqlQuery = {
      query: `
        query {
          searchBooks(search: "${searchTerm}") {
            id
            title
            author
            cover
            summary
          }
        }
      `,
    };

    const graphqlEndpoint = "https://booksearch-m4slaxoduq-uc.a.run.app";

    axios
      .post(graphqlEndpoint, graphqlQuery, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.data) {
          pullSearchResult(response.data.data.searchBooks);
        } else {
          console.error("Error in GraphQL query:", response.data.errors);
        }
      })
      .catch((error) => console.error("Error searching books:", error));
  };

  return (
    <div className="search-book">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a book"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
