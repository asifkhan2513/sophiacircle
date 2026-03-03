"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { routes, siteConfig } from "./config";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check login status
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    checkLogin();
    window.addEventListener("scroll", handleScroll);

    // Listen for storage changes (for cross-tab or same-page updates)
    window.addEventListener('storage', checkLogin);

    // We also check periodically or on route change as a fallback
    const interval = setInterval(checkLogin, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', checkLogin);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    setIsMobileMenuOpen(false);
    router.push('/login');
    router.refresh();
  };

  const isHome = pathname === "/";
  const navTextColor = (isHome && !scrolled && !isMobileMenuOpen) ? "text-white" : "text-black";
  const navBgColor = (scrolled || isMobileMenuOpen) ? "glass shadow-md py-2" : "bg-transparent py-4";

  // Filter routes based on login status
  const visibleRoutes = routes.filter(route => {
    if (route.path === '/login' || route.path === '/signup') return !isLoggedIn;
    if (route.path === '/dashboard') return isLoggedIn;
    return true;
  });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgColor}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border border-black/10 transition-all group-hover:scale-105 bg-white/10 backdrop-blur-sm">
              <img
                src={siteConfig.logo}
                alt={siteConfig.name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${navTextColor}`}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full flex items-center gap-2 ${isActive
                    ? "bg-black text-white"
                    : `${navTextColor} hover:bg-black/5`
                    }`}
                >
                  {Icon && <Icon size={16} />}
                  {route.name}
                </Link>
              );
            })}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full flex items-center gap-2 ${navTextColor} hover:bg-red-50 hover:text-red-500`}
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${navTextColor}`}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[600px] mt-4 pb-4" : "max-h-0"}`}>
          <div className="flex flex-col space-y-2">
            {visibleRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors flex items-center gap-3 ${isActive
                    ? "bg-black text-white shadow-lg"
                    : "text-black hover:bg-black/5"
                    }`}
                >
                  {Icon && <Icon size={20} />}
                  {route.name}
                </Link>
              );
            })}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-3 text-base font-medium rounded-xl transition-colors flex items-center gap-3 text-red-500 hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
