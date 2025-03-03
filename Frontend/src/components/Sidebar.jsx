import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-600 text-white p-5 h-screen">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <nav className="mt-5">
        <ul>
          <li className="py-2"><a href="#" className="hover:underline">Dashboard</a></li>
          <li className="py-2"><a href="#" className="hover:underline">Users</a></li>
          <li className="py-2"><a href="#" className="hover:underline">Websites</a></li>
          <li className="py-2"><a href="#" className="hover:underline">Notifications</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
