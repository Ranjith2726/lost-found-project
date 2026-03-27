import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function ReportFound() {

  const navigate = useNavigate();

  const [item, setItem] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    phone: ""   // ✅ added (important for backend)
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/items/report",
        {
          ...item,
          type: "found"   // ✅ IMPORTANT
        }
      );

      alert(response.data.message);

      // ✅ Reset form
      setItem({
        title: "",
        description: "",
        location: "",
        date: "",
        phone: ""
      });

      // ✅ Redirect to Items page
      navigate("/items");

    } catch (error) {
      alert(error.response?.data?.message || "Error submitting item");
    }
  };

  return (
    <div className="form-container">

      <div className="form-card modern-card">

        <h2 className="form-title">Report Found Item</h2>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <div className="input-group">
            <span className="input-icon">📦</span>
            <input
              type="text"
              name="title"
              placeholder="Item Name"
              value={item.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div className="input-group">
            <span className="input-icon">📝</span>
            <textarea
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* LOCATION */}
          <div className="input-group">
            <span className="input-icon">📍</span>
            <input
              type="text"
              name="location"
              placeholder="Location Found"
              value={item.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* DATE */}
          <div className="input-group">
            <span className="input-icon">📅</span>
            <input
              type="date"
              name="date"
              value={item.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* PHONE (VERY IMPORTANT 🔥) */}
          <div className="input-group">
            <span className="input-icon">📞</span>
            <input
              type="text"
              name="phone"
              placeholder="Contact Number"
              value={item.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button className="submit-btn modern-btn">
            Submit Found Item
          </button>

        </form>

      </div>

    </div>
  );
}

export default ReportFound;