/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Briefcase, Users, Clock, MapPin, Home, FileText, UserCheck } from "lucide-react";

const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    type: "Internship",
    location: "Remote",
    description: "Work on building user interfaces using React and TailwindCSS.",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "Senior Backend Engineer",
    type: "Full-time",
    location: "New York, NY",
    description: "Develop and maintain scalable backend services using Node.js and Express.",
    postedDate: "1 week ago",
  },
];

const JobCard = ({ job }) => (
  <div className="bg-[#1e293b] border border-blue-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-xl font-semibold text-teal-300">{job.title}</h3>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          job.type === "Internship"
            ? "bg-cyan-700 text-cyan-100"
            : job.type === "Full-time"
            ? "bg-green-700 text-green-100"
            : "bg-yellow-600 text-yellow-100"
        }`}
      >
        {job.type}
      </span>
    </div>
    <div className="flex items-center gap-6 text-gray-400 mb-4 text-sm">
      <div className="flex items-center gap-1">
        <MapPin size={16} />
        <span>{job.location}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock size={16} />
        <span>Posted {job.postedDate}</span>
      </div>
    </div>
    <p className="text-gray-300 leading-relaxed">{job.description}</p>
  </div>
);

const SidebarItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors ${
          isActive ? "bg-blue-800 text-white" : "text-gray-300"
        }`
      }
    >
      <Icon size={20} />
      <span className="text-lg font-medium">{label}</span>
    </NavLink>
  );
};

const Dashboard = () => {
  const [jobs] = useState(initialJobs);
  const navigate = useNavigate();
  const displayedJobs = jobs.slice(0, 2);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#111827] shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-extrabold text-cyan-400 border-b border-blue-900">
          Recruiter Panel
        </div>

        <nav className="flex flex-col flex-grow p-4 gap-2">
          <SidebarItem to="/recruiter" icon={Home} label="Home" />
          <SidebarItem to="/recruiter-dashboard" icon={Briefcase} label="Dashboard" />
          <SidebarItem to="/recruiter-postjob" icon={FileText} label="Post Job" />
          <SidebarItem to="/recruiter-applicants" icon={Users} label="Applicants" />
        </nav>

        <div className="p-6 text-sm text-gray-500 border-t border-blue-900">
          &copy; 2025 YourCompany
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-grow p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-cyan-400 drop-shadow-lg">
          Recruiter Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-tr from-blue-800 to-blue-900 shadow-lg rounded-3xl p-8 flex items-center gap-6 hover:scale-[1.03] transition-transform duration-300 cursor-default select-none">
            <div className="bg-cyan-400 p-4 rounded-full text-blue-900">
              <Briefcase size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Jobs Posted</h2>
              <p className="text-5xl font-extrabold mt-1">{jobs.length}</p>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-teal-800 to-teal-900 shadow-lg rounded-3xl p-8 flex items-center gap-6 hover:scale-[1.03] transition-transform duration-300 cursor-default select-none">
            <div className="bg-teal-400 p-4 rounded-full text-teal-900">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Total Applicants</h2>
              <p className="text-5xl font-extrabold mt-1">123</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/recruiter-postjob")}
            className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
          >
            + New Post
          </button>
        </div>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-teal-300 drop-shadow-md">
            Recent Job & Internship Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
