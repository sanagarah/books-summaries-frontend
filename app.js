import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import BookSummary from "./components/BookSummary";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ErrorPage from "./components/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { AuthProvider } from "./AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <BookList />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/book-summary/:bookId",
    element: (
      <>
        <NavBar />
        <BookSummary />
      </>
    ),
  },
  {
    path: "/add-book",
    element: (
      <>
        <NavBar />
        <AddBook />
      </>
    ),
  },
  {
    path: "/update-book/:bookId",
    element: (
      <>
        <NavBar />
        <UpdateBook />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <NavBar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <NavBar />
        <SignUp />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
