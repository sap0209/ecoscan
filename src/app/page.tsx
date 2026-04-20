"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const cardsData = [
  {
    title: "Identify Waste",
    icon: "📱",
    description: "EcoScan helps users recognize common waste items like bottles, wrappers, cans, and paper products through AI-powered image analysis."
  },
  {
    title: "Sort Smarter",
    icon: "♻️",
    description: "After identifying an item, EcoScan guides users toward the correct disposal method, reducing recycling mistakes and contamination."
  },
  {
    title: "How It Works",
    icon: "🎯",
    description: "Users open the scanner, hold an item in view, and let EcoScan analyze it. The app then explains what the item is and how it should be disposed of."
  },
  {
    title: "Our Mission",
    icon: "🌍",
    description: "EcoScan was created to make waste sorting easier, more accurate, and more accessible so that everyday actions can contribute to a cleaner environment."
  },
  {
    title: "Protect Nature",
    icon: "🌱",
    description: "By helping people build better disposal habits, EcoScan supports cleaner communities and helps reduce long-term harm to ecosystems."
  }
];



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const cardsSection = document.getElementById("cards-section");
      if (cardsSection) {
        const rect = cardsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        setIsInView(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cardsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-blue-50 to-green-50 scroll-smooth">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');

        body {
          font-family: 'Outfit', 'Poppins', sans-serif;
        }

        @keyframes slideCarousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        @keyframes aurora {
          0% {
            transform: translateX(-100%) translateY(0px);
            opacity: 0.15;
          }
          50% {
            transform: translateX(0px) translateY(-15px);
            opacity: 0.25;
          }
          100% {
            transform: translateX(100%) translateY(0px);
            opacity: 0.15;
          }
        }

        @keyframes auroraGreen {
          0% {
            transform: translateX(100%) translateY(-10px);
            opacity: 0.12;
          }
          50% {
            transform: translateX(0px) translateY(15px);
            opacity: 0.2;
          }
          100% {
            transform: translateX(-100%) translateY(-10px);
            opacity: 0.12;
          }
        }

        @keyframes fallLeaves {
          0% {
            transform: translateY(-10px) translateX(0) rotate(0deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(100vh) translateX(60px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glow {
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
        }

        .leaf {
          position: fixed;
          pointer-events: none;
          animation: fallLeaves linear infinite;
        }

        .leaf-1 { animation-duration: 12s; animation-delay: 0s; left: 15%; }
        .leaf-2 { animation-duration: 14s; animation-delay: 3s; left: 35%; }
        .leaf-3 { animation-duration: 13s; animation-delay: 6s; left: 65%; }
        .leaf-4 { animation-duration: 15s; animation-delay: 2s; left: 85%; }

        .aurora-bg {
          animation: aurora 15s ease-in-out infinite;
        }

        .aurora-bg-green {
          animation: auroraGreen 18s ease-in-out infinite;
        }

        .float {
          animation: float 6s ease-in-out infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .fade-in-up-delay-1 { animation-delay: 0.1s; }
        .fade-in-up-delay-2 { animation-delay: 0.2s; }
        .fade-in-up-delay-3 { animation-delay: 0.3s; }

        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .slide-in-right-delay-1 { animation-delay: 0.1s; }

        .card-animate {
          animation: cardSlideIn 0.6s ease-out forwards;
        }

        .tree-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          max-width: 800px;
          height: 100vw;
          max-height: 800px;
          background: radial-gradient(ellipse at center, rgba(34, 197, 94, 0.2) 0%, rgba(6, 182, 212, 0.12) 50%, transparent 80%);
          border-radius: 50%;
          z-index: 0;
          filter: blur(60px);
          pointer-events: none;
        }

        .cards-section-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease-out;
        }

        .cards-section-animate.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .card-container {
          transition: all 0.3s ease-out;
        }

        .card-container:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.15);
        }
      `}</style>

      {/* Falling Leaves */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`leaf leaf-${i} text-emerald-500 text-lg opacity-40`}>
            🍃
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-visible bg-gradient-to-b from-white via-green-50 to-blue-50">
        {/* Aurora Background Animation - Softer & Brighter */}
        <div className="absolute inset-0 opacity-100 pointer-events-none">
          {/* Bright Green Aurora */}
          <div className="aurora-bg-green absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-3xl opacity-20"></div>
          
          {/* Cyan Aurora */}
          <div className="aurora-bg absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-3xl opacity-18"></div>
          
          {/* Light Blue Aurora */}
          <div className="aurora-bg absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-r from-transparent via-blue-300 to-transparent blur-3xl opacity-15"></div>

          {/* Soft gradient overlays for depth */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute top-1/4 left-0 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-12"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-8"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full h-full flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
            {/* Left Side - Title, Subtitle, Text, Buttons */}
            <div className="flex-1 text-left max-w-2xl">
              <h1 className="fade-in-up text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  EcoScan
                </span>
              </h1>
              <p className="fade-in-up fade-in-up-delay-1 text-xl sm:text-2xl text-green-700 font-semibold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                AI-powered waste sorting with a live camera scanner
              </p>
              <p className="fade-in-up fade-in-up-delay-2 text-base sm:text-lg text-green-800 leading-relaxed mb-8 max-w-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Every piece of plastic matters. Sort waste correctly and help keep plastics out of oceans, landfills, and ecosystems. EcoScan's AI instantly identifies items and guides you to proper disposal.
              </p>

              {/* Buttons */}
              <div className="fade-in-up fade-in-up-delay-3 flex flex-col sm:flex-row gap-4">
                <a
                  href="#cards-section"
                  className="glow inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg text-lg"
                >
                  Explore
                </a>
                <a
                  href="#cards-section"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/70 backdrop-blur-md text-emerald-700 font-bold rounded-full border-2 border-emerald-400 hover:border-emerald-600 hover:bg-white transition-all duration-300 shadow-lg text-lg"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Side - Tree Image */}
            <div className="flex-1 relative flex items-center justify-center h-full w-full lg:w-auto overflow-hidden">
              <div className="tree-glow"></div>
              <div className="relative float flex items-center justify-center" style={{ animationDelay: "0.5s" }}>
                <div className="relative w-[500px] sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] h-auto max-w-full">
                  <Image
                    src="/goodtree.png"
                    alt="EcoScan Tree"
                    width={1600}
                    height={1600}
                    className="object-contain drop-shadow-lg w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Carousel Section */}
      <section 
        id="cards-section"
        className={`cards-section-animate ${isInView ? "in-view" : ""} relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 via-white to-blue-50`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-700 to-cyan-600 bg-clip-text text-transparent mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}>
              How EcoScan Works
            </h2>
            <p className="text-green-800 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Five simple features that help you sort waste correctly
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-20 p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 hover:scale-110 -ml-6 lg:-ml-16 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Carousel */}
            <div className="w-full overflow-hidden px-8">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                {cardsData.map((card, idx) => (
                  <div
                    key={idx}
                    className="w-full flex-shrink-0"
                  >
                    <div className="card-container bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 sm:p-12 shadow-xl border-2 border-emerald-200 h-96 flex flex-col justify-between mx-auto max-w-2xl">
                      <div>
                        <div className="text-6xl mb-6">{card.icon}</div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-6" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                          {card.title}
                        </h3>
                        <p className="text-green-800 text-lg leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-20 p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 hover:scale-110 -mr-6 lg:-mr-16 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlide
                    ? "w-8 h-3 bg-emerald-500"
                    : "w-3 h-3 bg-emerald-300 hover:bg-emerald-400"
                }`}
              />
            ))}
          </div>

          {/* Open Scanner Button */}
          <div className="flex justify-center mt-16 relative z-20">
            <Link
              href="/scanner"
              className="glow inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg text-lg relative pointer-events-auto"
            >
              Open Scanner
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-100 to-blue-100 border-t-2 border-emerald-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}>
              <span className="bg-gradient-to-r from-green-700 to-cyan-600 bg-clip-text text-transparent">
                EcoScan
              </span>
            </h3>
            <p className="text-green-800 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              AI-powered waste sorting for a sustainable future
            </p>
            <p className="text-green-700 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Made with 💚 for a cleaner planet. © 2026 EcoScan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

