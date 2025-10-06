"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  ArrowRight,
  Sparkles,
  Shield,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const socials = [
  { id: "twitter", icon: <FaTwitter />, url: "https://twitter.com/aksh8t" },
  { id: "github", icon: <FaGithub />, url: "https://github.com/Aksh8t" },
  {
    id: "linkedin",
    icon: <FaLinkedin />,
    url: "https://linkedin.com/in/Aksh8t",
  },
];
import Image from "next/image";

const messages = [
  {
    title: "Amazing Experience!",
    content:
      "This platform changed how I receive feedback. Completely anonymous and secure.",
    received: "2 hours ago",
  },
  {
    title: "Love the Privacy",
    content:
      "Finally, a place where people can be truly honest without fear of judgment.",
    received: "5 hours ago",
  },
  {
    title: "Game Changer",
    content:
      "The anonymity feature makes all the difference. Highly recommended!",
    received: "1 day ago",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div
        className="fixed inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.06), transparent)`,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow-delay" />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12 py-20 pt-32 md:pt-30">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto text-center space-y-8 mb-24 animate-fade-in-up ">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">
              Anonymous Feedback Platform
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="block text-white mb-4">Dive into the</span>
              <span className="block relative">
                <span className="relative z-10 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  Anonymous Feedback
                </span>
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-white/20 to-gray-500/20 -z-10" />
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Where your identity remains a secret. Share honest thoughts without
            boundaries.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => (window.location.href = "/sign-up")}
              className="group relative px-8 py-4 bg-white text-black rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform duration-100 group-hover:translate-x-1" />
              </span>
            </button>

            <button className="px-8 py-4 border border-white/20 hover:border-white/40 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/5 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24 w-full">
          {[
            {
              icon: Shield,
              title: "100% Anonymous",
              desc: "Complete privacy guaranteed with end-to-end encryption",
            },
            {
              icon: MessageCircle,
              title: "Real Feedback",
              desc: "Honest opinions without filters or boundaries",
            },
            {
              icon: Sparkles,
              title: "Secure Platform",
              desc: "Enterprise-grade security for your peace of mind",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:bg-white/10 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-4 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Messages Carousel */}
        <div
          className="max-w-3xl mx-auto w-full animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            What People Are Saying
          </h2>

          <div className="relative h-72">
            {messages.map((message, index) => {
              const isActive = index === currentIndex;
              const isNext = index === (currentIndex + 1) % messages.length;
              const isPrev =
                index ===
                (currentIndex - 1 + messages.length) % messages.length;

              return (
                <div
                  key={index}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : isNext || isPrev ? 0.3 : 0,
                    transform: isActive
                      ? "translateY(0) scale(1) rotateY(0deg)"
                      : isNext
                        ? "translateY(20px) scale(0.95) rotateY(5deg)"
                        : "translateY(-20px) scale(0.95) rotateY(-5deg)",
                    zIndex: isActive ? 10 : 1,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl hover:border-white/20 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {message.content}
                      </p>
                      <p className="text-sm text-gray-600">
                        {message.received}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-12 bg-white"
                      : "w-6 bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-xl mt-20">
        <div className="max-w-5xl mx-auto px-4 py-2 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Truly. All rights reserved. Built By{" "}
            <span className="text-emerald-500 font-semibold">
              Akshat Tiwari
            </span>
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-center px-10 pb-15">
          <ul className="flex gap-5">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl p-3 rounded-full bg-white/10 hover:bg-blue-500 transition-colors duration-300 backdrop-blur-md border border-white/10 hover:scale-110 transform"
              >
                {item.icon}
              </a>
            ))}
          </ul>
          <div className="flex justify-center gap-5 ">
            <div className="text-center pt-40">
              <p className="text-sm text-emerald-500 font-semibold">Support with UPI</p>
            </div>
            <Image
              src="/images/qr.jpg"
              width={500}
              height={800}
              alt="UPI QR Code"
              className="w-24 h-24 sm:w-50 sm:h-80 rounded-lg border border-white/10 shadow-md"
            />
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-slow-delay {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out backwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 8s ease-in-out 4s infinite;
        }
      `}</style>
    </div>
  );
}
