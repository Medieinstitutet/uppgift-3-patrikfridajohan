import "../styles/navbar.css";
import logo from "../assets/SCOPE__5_-removebg-preview.png";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../services/authService";
import axios from "axios";

export const Navbar = () => {
  const [loggedInState, setLoggedInState] = useState<{ loggedIn: boolean; isAdmin: boolean }>({ loggedIn: false, isAdmin: false });

  useEffect(() => {
    setLoggedInState(isLoggedIn());
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      if (response) {
        setLoggedInState({ loggedIn: false, isAdmin: false });
        window.location.href = "/";
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const renderLoggedInLinks = () => {
    if (loggedInState.isAdmin) {
      return (
        <>
          <a href="/admin/dashboard">Admin Dashboard</a>
          <a href="/admin/list-newsarticles">List Newsarticles</a>
          <a href="/admin/create-newsarticle">Create Newsarticle</a>
        </>
      );
    } else {
      return (
        <>
          <a href="/user/dashboard">Dashboard</a>
          <a href="/user/articlesforme">Articles for me</a>
          <a href="/user/subscriptions">Plans</a>
          <a href="/user/account">Profile</a>
        </>
      );
    }
  };

  const renderLoggedOutLinks = () => (
    <>
      <a href="/articles">Articles</a>
      <a href="/plans">Plans</a>
      <a href="/about">About</a>
      <button type="button" className="btn btn-light" id="nav-login" onClick={handleRedirect}>
        <a href="/login">Login</a>
      </button>
    </>
  );

  const handleRedirect = () => {
    window.location.href = "/login";
  }

  return (
    <nav>
      <div className="nav-container">
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>
        <div className="nav-items">
          {loggedInState.loggedIn ? renderLoggedInLinks() : renderLoggedOutLinks()}
          {loggedInState.loggedIn && (
            <button type="button" className="btn btn-light" id="nav-login" onClick={handleLogout}>
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
