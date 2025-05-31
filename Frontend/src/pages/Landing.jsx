import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const howItWorks = [
  {
    title: "Register & Create Profile",
    desc: "Students and recruiters create their accounts and set up detailed profiles for personalized experience.",
    icon: "👤",
  },
  {
    title: "Explore Jobs & Internships",
    desc: "Students browse and apply for relevant job and internship opportunities tailored to their skills and interests.",
    icon: "🔍",
  },
  {
    title: "Recruit & Manage",
    desc: "Recruiters post openings, review applications, and shortlist candidates easily using our dashboard.",
    icon: "💼",
  },
];

const features = [
  {
    title: "Role-Based Access",
    desc: "Different dashboards and features tailored to Students, Recruiters, and Admins for streamlined management.",
    icon: "🔐",
  },
  {
    title: "Real-Time Notifications",
    desc: "Stay updated with instant alerts on job openings, application status, and interview calls.",
    icon: "🔔",
  },
  {
    title: "Advanced Search Filters",
    desc: "Find the perfect opportunity quickly by filtering jobs and internships by location, skill, and more.",
    icon: "⚙️",
  },
  {
    title: "Application Tracking",
    desc: "Keep track of all your applications and their statuses in one convenient dashboard.",
    icon: "📊",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    img: "/images/priyaSharma.jpg",
    feedback:
      "ZIDIO Connect helped me find a perfect internship aligned with my career goals. The platform is user-friendly and the notifications kept me updated all the time!",
  },
  {
    name: "Rahul Verma",
    img: "/images/rahulVerma.jpg",
    feedback:
      "As a recruiter, managing job listings and applications is a breeze. The admin panel is very efficient, and I love the role-based access controls.",
  },
  {
    name: "Anita Singh",
    img: "/images/anitaSingh.jpg",
    feedback:
      "Great platform with a modern interface. The How It Works section made onboarding simple and the support team is very helpful.",
  },
];

const faqs = [
  {
    q: "How do I create an account?",
    a: "Click on the Register button, choose your role (Student/Recruiter), and fill in the required details to create your profile.",
  },
  {
    q: "Can I apply for multiple internships?",
    a: "Yes! You can apply for as many internships or jobs as you qualify for directly through your dashboard.",
  },
  {
    q: "How do recruiters shortlist candidates?",
    a: "Recruiters can view all applications and use the dashboard to shortlist or reject candidates with just a click.",
  },
  {
    q: "Is my personal data safe?",
    a: "Absolutely. ZIDIO Connect uses advanced security measures to keep your data safe and private.",
  },
];

export default function Landing() {
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Ref for testimonial carousel scroll container
  const carouselRef = useRef(null);

  // Auto-scroll testimonials every 3 seconds
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollAmount = 0;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    const interval = setInterval(() => {
      scrollAmount += carousel.clientWidth * 0.8; // scroll by card width approx
      if (scrollAmount > maxScroll) scrollAmount = 0;
      carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: "smooth" });
  };

  const scrollRight = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: "smooth" });
  };

  const toggleTestimonial = (index) =>
    setActiveTestimonial(index === activeTestimonial ? null : index);

  const toggleFaq = (index) => setActiveFaq(index === activeFaq ? null : index);

  return (
    <div className="font-sans bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white min-h-screen w-full overflow-x-hidden">
        {/* Background glowing circles */}
{/* Hero Section */}
<section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-8 sm:px-16 lg:px-28 pt-20 lg:pt-0 overflow-hidden w-full max-w-full mx-auto bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900">
  {/* Background glowing circles */}
  <div className="absolute -top-36 -left-36 w-[420px] h-[420px] rounded-full bg-cyan-500 opacity-20 animate-pulse mix-blend-screen blur-3xl"></div>
  <div className="absolute top-16 right-12 w-[320px] h-[320px] rounded-full bg-purple-600 opacity-25 animate-pulse mix-blend-screen blur-2xl"></div>

  {/* Left Content */}
  <div className="lg:w-1/2 space-y-10 z-10 max-w-lg">
    <h1 className="text-5xl sm:text-6xl font-extrabold text-cyan-400 leading-tight tracking-tight">
      Welcome to <br />
      <span className="text-purple-400 drop-shadow-lg">ZIDIO Connect</span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 max-w-md leading-relaxed tracking-wide">
      Smart platform to connect students with recruiters, internships, and job opportunities — all in one place with seamless experience.
    </p>
    <div className="flex gap-8 mt-8">
      <Link to="/register">
        <button className="px-10 py-4 bg-cyan-500 text-white rounded-3xl shadow-xl hover:bg-cyan-600 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400">
          Register
        </button>
      </Link>
      <Link to="/login">
        <button className="px-10 py-4 bg-transparent border-2 border-cyan-500 text-cyan-500 rounded-3xl shadow-xl hover:bg-cyan-500 hover:text-white transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400">
          Login
        </button>
      </Link>
    </div>
  </div>

  {/* Right Image */}
<div className="lg:w-1/2 z-10 mt-12 lg:mt-0 flex justify-center relative">
  <div className="relative">
<img
  src="/images/hero.jpg"
  alt="Hero Illustration"
  className="w-full max-w-xl rounded-3xl drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105"
  loading="lazy"
  decoding="async"
/>


    {/* Optional glowing effect under image */}
    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-cyan-400 opacity-10 blur-3xl rounded-full z-[-1]"></div>
  </div>
</div>

</section>


{/* How It Works Section */}
<section className="w-full max-w-full mx-auto px-6 sm:px-10 lg:px-20 py-20 bg-transparent">
    <div className="absolute -top-36 -left-36 w-[420px] h-[420px] rounded-full bg-cyan-500 opacity-20 animate-pulse mix-blend-screen blur-3xl"></div>
  <div className="absolute top-16 right-12 w-[320px] h-[320px] rounded-full bg-purple-600 opacity-25 animate-pulse mix-blend-screen blur-2xl"></div>

  <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">
    How It Works
  </h2>
  <div className="flex flex-col md:flex-row gap-12 justify-center max-w-[1400px] mx-auto">
    {howItWorks.map(({ title, desc, icon }, i) => (
      <div
        key={i}
        className="border border-cyan-600 rounded-3xl p-10 flex-1 max-w-sm shadow-md transition-transform hover:scale-105 hover:shadow-lg cursor-default bg-transparent"
      >
        <div className="w-16 h-16 mb-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-4xl shadow-md">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-cyan-300">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{desc}</p>
      </div>
    ))}
  </div>
</section>


{/* Features Section */}
<section className="w-full px-6 sm:px-10 lg:px-20 py-20 bg-transparent">
  <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">
    Features
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1400px] mx-auto">
    {features.map(({ title, desc, icon }, i) => (
      <div
        key={i}
        className="border border-cyan-600 rounded-2xl p-8 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-lg cursor-default"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="w-14 h-14 mb-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl shadow-md">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-cyan-300 mb-3">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-10 lg:px-20 py-20">
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">
          Testimonials
        </h2>
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-cyan-600 bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 z-20"
            aria-label="Scroll Left"
          >
            ◀
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-cyan-600 bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 z-20"
            aria-label="Scroll Right"
          >
            ▶
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-8 px-4"
          >
            {testimonials.map(({ name, img, feedback }, i) => (
              <div
                key={i}
                onClick={() => toggleTestimonial(i)}
                className={`flex-shrink-0 w-[320px] rounded-3xl p-8 cursor-pointer transition-transform duration-300 ${
                  activeTestimonial === i
                    ? "scale-105 ring-4 ring-cyan-400"
                    : "scale-100"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={img}
                    alt={`${name} photo`}
                    className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-cyan-300">{name}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-5xl mx-auto px-10 lg:px-20 py-20">
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16">
          FAQs
        </h2>
        <div className="space-y-6">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="bg-gradient-to-tr from-cyan-700 to-blue-900 rounded-3xl p-6 cursor-pointer shadow-lg"
              onClick={() => toggleFaq(i)}
            >
              <h3 className="text-xl font-semibold flex justify-between items-center">
                {q}
                <span className="ml-4 text-cyan-400 text-2xl select-none">
                  {activeFaq === i ? "−" : "+"}
                </span>
              </h3>
              {activeFaq === i && (
                <p className="mt-3 text-gray-300 leading-relaxed">{a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
