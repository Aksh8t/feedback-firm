"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function ModernNavbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-15">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-gray-300 transition-colors tracking-tight"
            >
              Truly
            </Link>

            {/* Nav Items */}
            <div className="flex items-center gap-8">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <span className="text-sm text-gray-400 font-medium">
                    {user.username || user.email}
                  </span>
                  <Button
                    onClick={() => signOut()}
                    className="px-6 py-2 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      className="text-gray-400 hover:text-white hover:bg-white/5 font-medium"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="px-6 py-2 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="text-xl font-bold text-white tracking-tight"
              >
                Truly
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-black border-b border-white/10 p-6 space-y-6 animate-slide-down">
            {session && (
              <div className="pb-4 border-b border-white/10">
                <span className="text-sm text-gray-400">
                  Welcome, {user.username || user.email}
                </span>
              </div>
            )}

            <div className="space-y-4">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors py-2 text-lg font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4">
              {session ? (
                <Button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-lg font-semibold"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/sign-in" className="w-full">
                    <Button
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/5 py-3 rounded-lg font-medium"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="w-full">
                    <Button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-lg font-semibold"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default ModernNavbar;
