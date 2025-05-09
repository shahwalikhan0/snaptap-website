"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, Admin, setAdmin } = useAdmin();

  const visibleNavItems = isLoggedIn
    ? [
        { name: "Home", path: "/" },
        { name: "Product", path: "/navigations/product" },
        { name: "Insights", path: "/navigations/insights" },
        {
          name: "Payment & Subscription",
          path: "/navigations/subscription-page",
        },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/navigations/pricing" },
        { name: "Product", path: "/navigations/product" },
      ];

  const handleNav = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleLogout = () => {
    setAdmin(null);
    router.push("/navigations/login");
  };

  // Handle outside click for mobile and user dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#00A8DE] text-white shadow-md h-20 flex items-center justify-between px-4 md:px-8">
      {/* Mobile: Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsUserDropdownOpen(false);
          }}
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
      <div className="flex items-center space-x-3 ml-auto relative">
        {!isLoggedIn && (
          <button
            onClick={() => handleNav("/navigations/sign-up")}
            className="hidden md:inline-block font-bold bg-white text-[#00A8DE] py-1.5 px-4 rounded-md hover:bg-[#00A8DE] hover:text-white transition-all"
          >
            Start Free Trial
          </button>
        )}

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
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => {
                setIsUserDropdownOpen(!isUserDropdownOpen);
                setIsMobileMenuOpen(false);
              }}
              className="font-bold text-sm md:text-base py-1.5 px-4 rounded-md 
                bg-white text-[#00A8DE] hover:bg-gray-200 
                md:bg-[#00A8DE] md:text-white md:hover:bg-[#007a9d] 
                transition-all"
            >
              {Admin?.username || "Admin"}
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-[#00A8DE] shadow-lg rounded-lg p-2 z-50 animate-slideDown">
                <button
                  onClick={() => handleNav("/navigations/manage-profile")}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-[#f0f0f0] rounded-md font-medium gap-2"
                >
                  <Icon icon="material-symbols:person" width={20} />
                  Manage Profile
                </button>
                <button
                  onClick={() => handleNav("/navigations/subscription-page")}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-[#f0f0f0] rounded-md font-medium gap-2"
                >
                  <Icon icon="fluent:payment-28-regular" width={20} />
                  Payment & Subscription
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-md font-medium gap-2"
                >
                  <Icon icon="majesticons:logout-line" width={20} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          ref={mobileDropdownRef}
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
