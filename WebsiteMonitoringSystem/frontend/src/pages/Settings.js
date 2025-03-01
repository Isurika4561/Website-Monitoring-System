import React from "react";

function Settings() {
  return (
    <div className="container">
      <h2>Settings</h2>
      <label>Email Notifications:</label>
      <input type="checkbox" />
      <br />
      <label>Monitoring Interval:</label>
      <select>
        <option>1 minute</option>
        <option>5 minutes</option>
        <option>10 minutes</option>
      </select>
    </div>
  );
}

export default Settings;
