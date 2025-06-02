/* eslint-disable no-unused-vars */
import React from "react";
import { FileText, ArrowLeft, Home, LayoutDashboard, FilePlus, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

// Mock applicant data
const mockApplicants = [
  {
    id: 1,
    name: "Chetan Sugandhi",
    email: "chetan@gmail.com",
    phone: "9876543210",
    education: "B.Tech in Computer Science",
    appliedRole: "Frontend Developer",
    applicationDate: "2025-05-30",
    status: "Shortlisted",
    resume: "#",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9123456780",
    education: "B.Sc in IT",
    appliedRole: "Backend Developer",
    applicationDate: "2025-05-28",
    status: "Pending",
    resume: "#",
  },
];

// Sort applicants by application date (latest first)
const sortedApplicants = [...mockApplicants].sort(
  (a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)
);

const statusColor = {
  Shortlisted: "text-green-400",
  Pending: "text-yellow-400",
  Rejected: "text-red-400",
};

const Applicants = () => {
  // Sidebar nav items
  const navItems = [
    { name: "Home", icon: Home, path: "/recruiter" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/recruiter-dashboard" },
    { name: "Post Job", icon: FilePlus, path: "/recruiter-postjob" },
    { name: "Applicants", icon: Users, path: "/recruiter-applicants" },
  ];

  return (
    <>
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="ml-60 min-h-screen p-6 font-sans bg-gradient-to-br from-[#1c1c1e] via-[#2a2a2d] to-[#000000] text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-red-500 tracking-tight drop-shadow-md">
            Applicants
          </h1>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white border border-gray-500 px-4 py-2 rounded-xl transition"
          >
            <ArrowLeft size={18} />
            <span className="text-base font-medium">Back</span>
          </button>
        </div>

        {/* Applicant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">{applicant.name}</h2>
                <span className={`text-sm font-semibold ${statusColor[applicant.status]}`}>
                  {applicant.status}
                </span>
              </div>

              <div className="text-base space-y-1 text-gray-300 mb-4">
                <p>
                  <span className="font-medium text-gray-400">Email:</span> {applicant.email}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Phone:</span> {applicant.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Education:</span> {applicant.education}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Role Applied:</span> {applicant.appliedRole}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Applied On:</span>{" "}
                  {new Date(applicant.applicationDate).toLocaleDateString("en-IN")}
                </p>
              </div>

              <a
                href={applicant.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
              >
                <FileText size={18} />
                <span className="text-base font-medium">View Resume</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Applicants;
