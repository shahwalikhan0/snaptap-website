"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/app/hooks/useAdminContext";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAdmin();

  const NAVBAR_ITEMS = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/navigations/pricing" },
    { name: "Product", path: "/navigations/product" },
  ];

  // Filter pricing tab if user is logged in
  const visibleNavItems = isLoggedIn
    ? [
        { name: "Home", path: "/" },
        { name: "Product", path: "/navigations/product" },
        { name: "Insights", path: "/navigations/insights" },
        { name: "Payment & Subscription", path: "/navigations/payments" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/navigations/pricing" },
        { name: "Product", path: "/navigations/product" },
      ];

  const handleNav = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#00A8DE] text-white shadow-md h-20 flex items-center justify-between px-4 md:px-8">
      {/* Mobile: Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Desktop Left: Logo + Nav */}
      <div className="hidden md:flex items-center space-x-10">
        <div className="cursor-pointer" onClick={() => handleNav("/")}>
          <img
            src="/assets/icon.png"
            alt="SnapTap Logo"
            className="h-16 w-16 object-contain"
          />
        </div>
        <div className="flex space-x-4">
          {visibleNavItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNav(item.path)}
              className="font-bold py-1.5 px-6 rounded-full hover:bg-white hover:text-[#00A8DE] transition-all"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Center: Logo */}
      <div
        className="md:hidden absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => handleNav("/")}
      >
        <img
          src="/assets/icon.png"
          alt="SnapTap Logo"
          className="h-16 w-16 object-contain"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-3 ml-auto">
        {!isLoggedIn && (
          <button
            onClick={() => handleNav("/navigations/sign-up")}
            className="hidden md:inline-block font-bold bg-white text-[#00A8DE] py-1.5 px-4 rounded-md hover:bg-[#00A8DE] hover:text-white transition-all"
          >
            Start Free Trial
          </button>
        )}

        {/* Mobile & Desktop Login/Logout button */}
        {!isLoggedIn ? (
          <button
            onClick={() => handleNav("/navigations/login")}
            className="font-bold text-sm md:text-base py-1.5 px-4 rounded-md 
             bg-white text-[#00A8DE] hover:bg-gray-200 
             md:bg-[#00A8DE] md:text-white md:hover:bg-[#007a9d] 
             transition-all"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => handleNav("/navigations/login")}
            className="font-bold text-sm md:text-base py-1.5 px-4 rounded-md 
             bg-white text-[#00A8DE] hover:bg-gray-200 
             md:bg-[#00A8DE] md:text-white md:hover:bg-[#007a9d] 
             transition-all"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-sm text-[#00A8DE] shadow-md z-40 animate-slideDown md:hidden"
        >
          <div className="flex flex-col p-4 space-y-4">
            {visibleNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className="text-lg font-semibold text-left hover:underline"
              >
                {item.name}
              </button>
            ))}

            {/* Show trial in dropdown only if not logged in */}
            {!isLoggedIn && (
              <button
                onClick={() => handleNav("/navigations/sign-up")}
                className="text-lg font-semibold text-left hover:underline"
              >
                Start Free Trial
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
