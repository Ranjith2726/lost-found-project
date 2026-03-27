import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTANT
import "../styles/main.css";

function Login() {

  const navigate = useNavigate(); // ✅ FOR REDIRECT

  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const url = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const response = await axios.post(url, {
        name: form.name,
        email: form.email,
        password: form.password
      });

      // ✅ SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      alert(response.data.message || "Success");

      // 🔥 REDIRECT TO HOME PAGE
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="form-container">

      <div className="form-card modern-card">

        <h2 className="form-title">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* NAME (Signup only) */}
          {isSignup && (
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* EMAIL */}
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          {isSignup && (
            <div className="input-group">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* LOGIN OPTIONS */}
          {!isSignup && (
            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span className="forgot">Forgot Password?</span>
            </div>
          )}

          <button className="submit-btn modern-btn">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

        </form>

        {/* TOGGLE */}
        <div className="auth-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Sign In" : " Sign Up"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Login;