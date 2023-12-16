import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { isAuthenticated, username, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/add-book" className="nav-link">
          Add Book
        </Link>
      </div>
      {isAuthenticated ? (
        <div className="nav-user-authentication">
          <p>Welcome, {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-user-authentication">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignUpClick}>Sign Up</button>
        </div>
      )}
    </nav>
  );
}
