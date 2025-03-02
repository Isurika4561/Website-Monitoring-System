import React from "react";

const notifications = [
  { id: 1, message: "Google is back online!", type: "success" },
  { id: 2, message: "Facebook went down 5 minutes ago", type: "error" }
];

const Notifications = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`p-3 my-2 rounded-md ${notification.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
