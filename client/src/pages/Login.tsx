import { useState } from "react";
import "../styles/login.css";
import axios from "axios";

export const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const login = async () => {
    if (!emailInput || !passwordInput) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post("LOGIN ENDPOINT", {
        email: emailInput,
        password: passwordInput,
      });
      console.log(response.data);

      // REDIRECT
      // COOKIE ?

      console.log("Login successfull");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="main-section">
      <div className="login-container">
        <div className="gradient">
          <h3>Welcome back!</h3>
          <p>
            Good to see you, we've missed you. <br /> Login to see your
            dashboard.
          </p>
        </div>
        <div className="form-container">
          <h3>Login</h3>
          <form>
            <label>Email</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn"
              id="login-btn"
              onClick={login}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="register-container">
        <p>Not a member yet?</p>
        <a href="">Sign up!</a>
      </div>
    </div>
  );
};
