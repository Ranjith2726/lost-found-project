import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import "../styles/main.css";

function ReportLost(){

const navigate = useNavigate(); // ✅ ADD THIS

const [item,setItem]=useState({
title:"",
description:"",
location:"",
date:""
})

const handleChange=(e)=>{
setItem({...item,[e.target.name]:e.target.value})
}

const handleSubmit = async (e) => {
e.preventDefault();

try {

const response = await axios.post(
  "http://localhost:5000/api/items/report",
  {
    ...item,
    type: "lost"
  }
);

// ✅ ALERT + REDIRECT
alert(response.data.message);
navigate("/items");

setItem({
  title:"",
  description:"",
  location:"",
  date:""
});

} catch (error) {
alert(error.response?.data?.message || "Error submitting item");
}

}

return(

<div className="form-container">

<div className="form-card modern-card">

<h2 className="form-title">Report Lost Item</h2>

<form onSubmit={handleSubmit}>

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

<div className="input-group">
<span className="input-icon">📍</span>
<input
type="text"
name="location"
placeholder="Location Lost"
value={item.location}
onChange={handleChange}
required
/>
</div>

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

<button className="submit-btn modern-btn">
Submit Lost Item
</button>

</form>

</div>

</div>

)

}

export default ReportLost;