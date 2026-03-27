import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";

function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items/items");
      setItems(res.data);
    } catch (error) {
      console.log("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleClaim = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/items/claim/${id}`);
      alert("Item claimed successfully");
      fetchItems();
    } catch (error) {
      alert("Error claiming item");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading items...</h2>;
  }

  const lostItems = items.filter(item => item.type === "lost");
  const foundItems = items.filter(item => item.type === "found");

  return (
    <div className="items-container">

      {/* LOST ITEMS */}
      <section>
        <h2 className="section-title lost">Lost Items</h2>

        <div className="card-grid">
          {lostItems.map((item) => (
            <div className="card" key={item._id}>

              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt="item"
                  className="card-img"
                />
              )}

              <div className="card-content">
                <h3>{item.title}</h3>
                <p className="meta">📍 {item.location}</p>
                <p className="meta">📅 {new Date(item.date).toDateString()}</p>

                <button
                  className="claim-btn"
                  onClick={() => handleClaim(item._id)}
                >
                  Claim Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUND ITEMS */}
      <section>
        <h2 className="section-title found">Found Items</h2>

        <div className="card-grid">
          {foundItems.map((item) => (
            <div className="card" key={item._id}>

              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt="item"
                  className="card-img"
                />
              )}

              <div className="card-content">
                <h3>{item.title}</h3>
                <p className="meta">📍 {item.location}</p>
                <p className="meta">📅 {new Date(item.date).toDateString()}</p>

                <button
                  className="claim-btn"
                  onClick={() => handleClaim(item._id)}
                >
                  Claim Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Items;