import React, { useState, useEffect } from "react";

const App = () => {
  const [search, setSearch] = useState(""); // State for search input
  const [data, setData] = useState([]); // State for fetched data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/investments`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on the search input
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Styles
  const styles = {
    container: {
      fontFamily: "'Source Sans Pro', sans-serif",
      backgroundColor: "#f4f4f9",
      color: "#2c3e50",
      padding: "20px",
      minHeight: "100vh",
    },
    header: {
      textAlign: "center",
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#34495e",
      textShadow: "2px 2px #ecf0f1",
    },
    searchInput: {
      marginBottom: "20px",
      padding: "10px",
      width: "100%",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    tableWrapper: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#1abc9c",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
      color: "#2c3e50",
    },
    trOdd: {
      backgroundColor: "#ecf0f1",
    },
    trEven: {
      backgroundColor: "#ffffff",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      color: "#7f8c8d",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Portfolio Tracker</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Investment Name"
        style={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Handle loading, error, and data display */}
      {loading && <p>Loading investments...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Investment Name</th>
                <th style={styles.th}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                >
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>{item.name}</td>
                  <td
                    style={{
                      ...styles.td,
                      color: item.amount < 0 ? "red" : styles.td.color,
                    }}
                  >
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2025 Portfolio Tracker | All Rights Reserved</p>
      </div>
    </div>
  );
};

export default App;
