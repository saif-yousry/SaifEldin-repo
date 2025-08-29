// src/components/history.js
import React from "react";
import "./history.css";

function History({ activityHistory }) {
  return (
    <div className="history-container">
      <h3>Activity History</h3>
      {activityHistory.length === 0 ? (
        <p>No activity recorded yet.</p>
      ) : (
        <ul>
          {activityHistory.map((act, index) => (
            <li key={index}>
              <strong>{act.email}</strong> — {act.action.replace("_", " ")} at {act.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
