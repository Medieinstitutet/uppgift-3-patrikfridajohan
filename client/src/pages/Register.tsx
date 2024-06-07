import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/register.css";
import { registerUser, checkUserEmail } from "../services/authService";
import eye from "../assets/visibility_40dp_FILL0_wght400_GRAD0_opsz40.svg"

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  
    if (name === "email") {
      try {
        const exists = await checkUserEmail(value);
        setEmailExists(exists);
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }
  
    if (name === "password" || name === "confirmPassword") {
      validatePassword(name === "password" ? value : userData.password, name === "confirmPassword" ? value : userData.confirmPassword);
    }
  };

  const validatePassword = (password, confirmPassword) => {
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setFormValid(false);
    } else if (!validatePasswordFormat(password)) {
      setPasswordError("Password must be 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and one special character.");
      setFormValid(false);
    } else {
      setPasswordError("");
      setFormValid(true);
    }
  };
  
  

  const validatePasswordFormat = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  
    try {
      const formattedData = {
        firstname: capitalizeFirstLetter(userData.firstname),
        lastname: capitalizeFirstLetter(userData.lastname),
        email: userData.email,
        password: userData.password
      };
  
      await registerUser(formattedData);
      window.alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    setFormValid(userData.email && !emailExists && !passwordError);
  }, [userData.email, emailExists, passwordError]);
  
return (
    <div className="main">
      <div className="register-hero-container">
        <div className="info">
          <h3>Become a member of SCOPE</h3>
          <p>Get the best handpicked articles for every occasion</p>
        </div>
        <div className="reg-form">
          <form onSubmit={handleSubmit}>
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              value={userData.firstname}
              onChange={handleChange}
              required 
            />
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              required 
            />
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required 
            />
            {emailExists && <p>Email already exists.</p>}
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleChange}
                required 
              />
              <button
                type="button"
                className="btn password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : (
                  <div className="eye">
                    <img src={eye} alt="eye" />
                  </div>
                )}
              </button>
            </div>
            <label>Confirm password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <button
                type="button"
                className="btn password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : (
                  <div className="eye">
                    <img src={eye} alt="eye" />
                  </div>
                )}
              </button>
            </div>
            <p>{passwordError}</p>
            <button type="submit" className="btn" id="login-btn" disabled={!formValid}>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};