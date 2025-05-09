import React from 'react';
import './Home.css'; // Make sure this CSS file exists in the same folder

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Journal App</h1>
      <p className="home-subtitle">
        Create, manage, and explore journal entries from yourself and others.
      </p>
    </div>
  );
}

export default Home;
