// src/components/dashboard.js
import React from 'react'
import './dashboard.css'

function Dashboard({ handleLogout, currentUser }) {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {currentUser ? currentUser.email : 'Guest'}</h2>
      <p>This is your dashboard. You can see your data and access the SmartLock controls below.</p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
