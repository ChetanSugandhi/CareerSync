import React, { useState } from "react";
import { Briefcase, MapPin, Calendar, IndianRupee } from "lucide-react";

const mockData = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechSolutions",
    location: "Jaipur, Rajasthan",
    duration: "3 Months",
    stipend: "₹8,000/month",
    description:
      "Work on React.js frontend applications, collaborating with designers and backend teams to build user-friendly interfaces.",
  },
  {
    id: 2,
    title: "Data Analyst Internship",
    company: "SmartInsights",
    location: "Remote",
    duration: "6 Months",
    stipend: "₹10,000/month",
    description:
      "Analyze datasets, generate insights, and build visualizations using tools like Python, Excel, and Power BI.",
  },
  {
    id: 3,
    title: "Backend Developer (Node.js)",
    company: "CodeWorks",
    location: "Udaipur, Rajasthan",
    duration: "4 Months",
    stipend: "₹12,000/month",
    description:
      "Build APIs and backend systems using Node.js, Express, and MongoDB. Collaborate with frontend teams to deliver full-stack solutions.",
  },
];

const Internship = () => {
  const [selected, setSelected] = useState(null);

  const openDetail = (item) => setSelected(item);
  const closeDetail = () => setSelected(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Jobs & Internships</h1>

      <div className="space-y-5 max-w-5xl mx-auto">
        {mockData.map((item) => (
          <div
            key={item.id}
            onClick={() => openDetail(item)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 flex items-center mt-1">
                  <Briefcase size={16} className="mr-1" /> {item.company}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin size={16} className="mr-1" /> {item.location}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1">
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center">
                  <Calendar size={14} className="mr-1" /> {item.duration}
                </span>
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center">
                  <IndianRupee size={14} className="mr-1" /> {item.stipend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full relative">
            <button
              onClick={closeDetail}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">{selected.title}</h2>
              <p className="text-gray-700"><strong>Company:</strong> {selected.company}</p>
              <p className="text-gray-700"><strong>Location:</strong> {selected.location}</p>
              <p className="text-gray-700"><strong>Duration:</strong> {selected.duration}</p>
              <p className="text-gray-700"><strong>Stipend:</strong> {selected.stipend}</p>
              <hr className="my-3" />
              <p className="text-gray-600">{selected.description}</p>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={closeDetail}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg mr-2"
              >
                Close
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internship;
