import React from "react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", 
        color: "white",
      }}
    >
      <div>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Welcome to the Seller Dashboard
        </h1>
        <p style={{ fontSize: "1.25rem" }}>
          Manage your products, view sales, and grow your business all in one place.
        </p>
      </div>
    </div>
  );
};

export default Home;
