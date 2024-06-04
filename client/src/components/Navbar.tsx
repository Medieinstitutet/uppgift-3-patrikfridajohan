import "../styles/navbar.css";
import logo from "../assets/SCOPE__5_-removebg-preview.png";
import { useEffect, useState } from "react";
import { getCookie } from "../services/cookieService";
import axios from "axios";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const sessionCookie = getCookie("sessionID");
    if (sessionCookie) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout")

      if (response) {
        setIsLoggedIn(false);
        window.location.href = '/'
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav>
      <div className="nav-container">
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>
        <div className="nav-items">
          <a href="/user/subscriptions">Plans</a>
          {isLoggedIn ? (
            <a href="/user/dashboard">Dashboard</a>
          ):(
            <a href="/dashboard">Dashboard</a>
          )}
          <a href="">About</a>
          {isLoggedIn ? (
            <>
              <a href="/user/account">Profile</a>
              <button type="button" className="btn btn-light" id="nav-login" onClick={handleLogout}>
                <a>Log out</a>
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-light" id="nav-login">
              <a href="/login">Login</a>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
