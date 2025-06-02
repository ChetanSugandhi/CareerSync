import React from "react";
import { Home, LayoutDashboard, FilePlus, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Post Job", icon: FilePlus, path: "/recruiter-postjob" },
    { name: "Applicants", icon: Users, path: "/applicants" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-gradient-to-b from-[#0f172a] to-[#1e293b] shadow-lg p-6 flex flex-col">
      <h2 className="text-3xl font-bold text-cyan-400 mb-12">Recruiter</h2>
      <nav className="flex flex-col gap-6">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-colors ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "text-gray-300 hover:bg-cyan-700 hover:text-white"
              }`
            }
          >
            <Icon size={24} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
