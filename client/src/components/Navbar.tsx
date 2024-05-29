import "../styles/navbar.css";
import logo from "../assets/SCOPE__5_-removebg-preview.png";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // const sessionCookie = Cookies.get("session");    CHECK SESSION
    // if (sessionCookie) {
    //   setIsLoggedIn(true);
    // }
  }, []);

  return (
    <nav>
      <div className="nav-container">
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>
        <div className="nav-items">
          <a href="">Pricing</a>
          <a href="">Articles</a>
          <a href="">About</a>
          <button type="button" className="btn btn-light" id="nav-login">
            {isLoggedIn ? (
              <a href="/user/account">Profile</a>
            ) : (
              <a href="/login">Login</a>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
