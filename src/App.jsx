import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [formData, setFormData] = useState({ name: "", age: "", group: "" });
  const [aggregatedData, setAggregatedData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mongo-aggregate-backend.onrender.com/data", formData);
      alert(response.data.message);
      setFormData({ name: "", age: "", group: "" });
    } catch (err) {
      console.error(err);
      alert("Error submiting data", err.message);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchAggregatedData = async () => {
    try {
      const response = await axios.get("https://mongo-aggregate-backend.onrender.com/aggregate");
      setAggregatedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAggregatedData();
  }, []);
  return (
    <>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1>Mongo DB Aggregation</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="group"
            placeholder="Group"
            value={formData.group}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>

        <h2>Aggregated Data</h2>
        {aggregatedData ? (
          <div>
            <h3>Group Count</h3>
            <ul>
              {aggregatedData.groupbyGroup.map((item) => (
                <li key={item._id}>
                  {item._id}: {item.count}
                </li>
              ))}
            </ul>

            <h3>Average Age</h3>
            <p>{aggregatedData.averageAge[0]?.avgAge || "N/A"} years</p>

            <h3>Sorted Data By Name</h3>
            <ul>
              {aggregatedData.sortedData.map((item) => (
                <li key={item._id}>
                  {item.name} - {item.age} - {item.group}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
