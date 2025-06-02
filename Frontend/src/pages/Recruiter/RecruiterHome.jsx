import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, LayoutDashboard } from "lucide-react";

const RecruiterLandingPage = () => {
  const navigate = useNavigate();

const features = [
  {
    title: "Dashboard",
    description: "Track job performance, applicant stats, and manage your activity.",
    icon: LayoutDashboard,
    link: "/recruiter-dashboard",
  },
  {
    title: "Post a Job",
    description: "Publish new job or internship openings in just a few steps.",
    icon: Briefcase,
    link: "/recruiter-postjob",
  },
  {
    title: "View Applicants",
    description: "See all applications, filter by skills, and shortlist easily.",
    icon: Users,
    link: "/recruiter-applicants",
  },
];


  return (
    <div className="min-h-screen font-sans text-white bg-gradient-to-br from-black via-[#1a0000] to-[#2b0000]">
      {/* Hero */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-black via-red-900 to-black">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-400">
          Welcome Back, Recruiter 👋
        </h1>
        <p className="text-lg text-red-200 max-w-xl mx-auto mb-6">
          Post jobs, manage applicants, and streamline your hiring process — all in one place.
        </p>
        <button
          onClick={() => navigate("/recruiter-dashboard")}
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Go to Dashboard
        </button>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0d0000] via-[#1a0000] to-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(feature.link)}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-red-700 shadow-md transition-all duration-300"
              >
                {/* Fill animation background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />

                {/* Content */}
                <div className="relative z-10 p-6 group-hover:text-white">
                  <div className="flex justify-center mb-4">
                    <Icon size={40} className="text-red-300 group-hover:text-white transition duration-300" />
                  </div>
                  <h2 className="text-xl font-semibold text-center mb-2">{feature.title}</h2>
                  <p className="text-center text-red-100 group-hover:text-white transition duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RecruiterLandingPage;
