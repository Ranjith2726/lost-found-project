import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import "../styles/main.css";

function Home() {

  const navigate = useNavigate(); // ✅ added

  return (
    <section className="hero-section">

      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-text">
          <h1>
            Lost Something <br /> on Campus?
          </h1>

          <p>
            Our Lost & Found platform helps students quickly report lost
            items and connect with people who found them.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate("/report-lost")} // ✅ added
            >
              Report Lost Item
            </button>

            <button 
              className="btn-secondary"
              onClick={() => navigate("/items")} // ✅ added
            >
              Browse Found Items
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Home;