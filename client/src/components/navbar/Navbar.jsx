import { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/")
  };

  function handleLogIn(){
    navigate("/login")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BookBnB</span>
          <hr />
        </Link>
        {user ? (
          <div className="profile">
          <div className="usernamePro">{user.otherDetails.username}</div>
          <button className="logoutBtn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleLogIn}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
