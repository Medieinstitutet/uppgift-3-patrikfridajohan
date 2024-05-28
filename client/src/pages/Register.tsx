import { useState } from "react";
import "../styles/register.css";
import axios from "axios";

export const Register = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    if (!emailInput || !passwordInput || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (confirmPassword !== passwordInput) {
      alert("Password and Confirm Password must match.");
      return;
    }

    try {
      const response = await axios.post("REGISTER ENDPOINT", {
        email: emailInput,
        password: passwordInput,
      });
      console.log(response.data);

      console.log("Registration successfull");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="register-hero-container">
          <div className="info">
            <h3>Become a member of SCOPE</h3>
            <p>Get the best handpicked articles for every occation</p>
          </div>
          <div className="reg-form">
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
              <label>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="submit"
                className="btn"
                id="login-btn"
                onClick={register}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="tier-section">
        <h2>Explore our tiers</h2>
        <div className="tiers">
          <div className="tier-unit" id="standard">
            <h3>SCOPE Standard</h3>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
              <li>Etiam rhoncus, nulla in dignissim mattis</li>
              <li>
                Phasellus dictum lorem nulla, dignissim rhoncus turpis consequat
                et
              </li>
              <li>
                Praesent vel nisi lacinia mauris convallis ultrices. Suspendisse
                felis libero, accumsan ut tincidunt in, hendrerit id leo.
              </li>
            </ul>
            <h4 className="price">$2/month</h4>
          </div>
          <div className="tier-unit" id="plus">
            <h3>SCOPE Plus</h3>
            <ul>
              <li>Everything SCOPE Standard tier includes</li>
              <li>Aenean gravida ac neque quis consequat</li>
              <li>Curabitur ut metus metus</li>
              <li>
                Quisque diam dolor, rhoncus sit amet mauris at, lobortis cursus
                turpis
              </li>
            </ul>
            <h4 className="price">$4/month</h4>
          </div>
          <div className="tier-unit" id="exclusive">
            <h3>SCOPE Exclusive</h3>
            <ul>
              <li>Everything SCOPE Plus tier includes</li>
              <li>Donec non sodales lorem</li>
              <li>
                Suspendisse ullamcorper, dui ac hendrerit convallis, velit orci
                tincidunt arcu, sed pretium mi arcu ac est
              </li>
            </ul>
            <h4 className="price">$7/month</h4>
          </div>
        </div>
      </div>
    </>
  );
};
