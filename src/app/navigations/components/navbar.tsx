"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import clsx from "clsx";

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
      className={clsx(
        "fixed z-50 left-4 right-4 top-4 mx-auto transition-all duration-500 ease-in-out",
        "rounded-2xl backdrop-blur-lg border border-white/30 shadow-xl",
        "bg-white/80 text-[#00A8DE]",
        isScrolled && "shadow-2xl translate-y-0",
        !isScrolled && "-translate-y-2"
      )}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        <div
          className="flex-shrink-0 cursor-pointer flex items-center"
          onClick={() => handleNav("/")}
        >
          <Image
            src="/assets/icon.png"
            alt="SnapTap Logo"
            width={64}
            height={64}
            priority
            className="object-contain max-h-[52px] sm:max-h-[56px] scale-[1.25]"
          />
        </div>

        <div className="hidden md:flex flex-1 justify-start items-center space-x-8 ml-8">
          {visibleNavItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNav(item.path)}
              className="relative font-semibold text-[17px] xl:text-[18px] hover:text-[#007a9d] transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#00A8DE] after:w-0 hover:after:w-full after:transition-all"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <button
              onClick={() => handleNav("/navigations/sign-up")}
              className="hidden md:inline-block font-bold text-sm xl:text-base bg-[#00A8DE] text-white px-6 py-2.5 rounded-full hover:bg-[#007a9d] transition"
            >
              Start Free Trial
            </button>
          )}

          {!isLoggedIn ? (
            <button
              onClick={() => handleNav("/navigations/login")}
              className="font-bold text-sm xl:text-base px-6 py-2.5 border border-[#00A8DE] text-[#00A8DE] rounded-full hover:bg-[#00A8DE] hover:text-white transition"
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 font-bold text-sm xl:text-base px-6 py-2.5 rounded-full bg-[#00A8DE] text-white hover:bg-[#007a9d] transition"
              >
                <Icon icon="material-symbols:account-circle-full" width={22} />
                {Admin?.username}
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-[#00A8DE] shadow-xl rounded-xl p-3 z-50 animate-fadeIn">
                  <button
                    onClick={() => handleNav("/navigations/manage-profile")}
                    className="w-full px-4 py-2 hover:bg-gray-100 rounded-md text-left flex items-center gap-2"
                  >
                    <Icon icon="material-symbols:person" width={18} />
                    Manage Profile
                  </button>
                  <button
                    onClick={() => handleNav("/navigations/subscription-page")}
                    className="w-full px-4 py-2 hover:bg-gray-100 rounded-md text-left flex items-center gap-2"
                  >
                    <Icon icon="fluent:payment-28-regular" width={18} />
                    Subscription
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 hover:bg-red-100 text-red-500 rounded-md text-left flex items-center gap-2"
                  >
                    <Icon icon="majesticons:logout-line" width={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Icon icon="ph:list-bold" width={28} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileDropdownRef}
          className="md:hidden px-4 pb-4 animate-fadeIn"
        >
          <div className="flex flex-col gap-3">
            {visibleNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className="text-left w-full font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                {item.name}
              </button>
            ))}
            {!isLoggedIn && (
              <button
                onClick={() => handleNav("/navigations/sign-up")}
                className="text-left font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition"
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
