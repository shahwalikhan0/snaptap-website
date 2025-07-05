"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } text-[#00A8DE] h-14 md:h-18 flex items-center justify-between px-4 md:px-8`}
    >
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsUserDropdownOpen(false);
          }}
          className="focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className="block w-6 h-0.5 bg-[#00A8DE] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#00A8DE] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#00A8DE]"></span>
        </button>
      </div>

      {/* Desktop Logo + Nav */}
      <div className="hidden md:flex items-center space-x-10">
        <div className="cursor-pointer" onClick={() => handleNav("/")}>
          <Image
            src="/assets/icon.png"
            alt="SnapTap Logo"
            width={70}
            height={73}
            priority
          />
        </div>
        <div className="flex space-x-4">
          {visibleNavItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNav(item.path)}
              className="font-bold text-[17px] text-[#00A8DE] py-1.5 px-4 border-b-3 border-transparent hover:border-[#00A8DE] transition-all cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Logo Centered */}
      <div
        className="md:hidden absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => handleNav("/")}
      >
        <Image
          src="/assets/icon.png"
          alt="SnapTap Logo"
          width={64}
          height={64}
          priority
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 ml-auto relative">
        {!isLoggedIn && (
          <button
            onClick={() => handleNav("/navigations/sign-up")}
            className="hidden md:inline-block font-bold bg-[#00A8DE] text-white py-1.5 px-4 rounded-md hover:bg-[#007a9d] transition-all cursor-pointer"
          >
            Start Free Trial
          </button>
        )}

        {!isLoggedIn ? (
          <button
            onClick={() => handleNav("/navigations/login")}
            className="font-bold text-sm md:text-base py-1.5 px-4 rounded-md 
              bg-[#00A8DE] text-white hover:bg-[#007a9d] 
              md:bg-white md:text-[#00A8DE] md:hover:bg-gray-200 
              transition-all cursor-pointer"
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
              className="flex items-center gap-2 font-bold text-sm md:text-base py-1.5 px-4 rounded-md 
              bg-[#00A8DE] text-white hover:bg-[#007a9d] 
              md:bg-white md:text-[#00A8DE] md:hover:bg-gray-200 
              transition-all cursor-pointer"
            >
              <Icon icon="material-symbols:account-circle-full" width={24} />
              <span className="hidden md:inline">
                {Admin?.username || "Admin"}
              </span>
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#E3E3E3] text-[#00A8DE] shadow-lg rounded-lg p-2 z-50 animate-slideDown">
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          ref={mobileDropdownRef}
          className="absolute top-16 left-4 w-11/12 bg-[#E3E3E3] text-[#00A8DE] shadow-lg rounded-lg p-2 z-40 animate-slideDown md:hidden"
        >
          <div className="flex flex-col p-2 space-y-2">
            {visibleNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-[#f0f0f0] rounded-md font-medium gap-2"
              >
                {item.name}
              </button>
            ))}

            {!isLoggedIn && (
              <button
                onClick={() => handleNav("/navigations/sign-up")}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-[#f0f0f0] rounded-md font-medium gap-2"
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
