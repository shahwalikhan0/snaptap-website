"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Modal } from "antd";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, Admin, setAdmin } = useAdmin();

  const visibleNavItems = isLoggedIn
    ? [
        // { name: "Home", path: "/" },
        { name: "Inventory", path: "/app/inventory" },
        { name: "Insights", path: "/app/insights" },
        {
          name: "Payment & Subscription",
          path: "/app/subscription-page",
        },
        { name: "Docs", path: "/app/docs" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/app/pricing" },
        { name: "Product", path: "/app/product" },
        { name: "Docs", path: "/app/docs" },
      ];

  const handleNav = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
    setIsUserDropdownOpen(false);
  };

  const confirmLogout = () => {
    setAdmin(null);
    setShowLogoutConfirm(false);
    router.push("/app/login");
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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "fixed z-50 left-2 right-2 sm:left-4 sm:right-4 top-2 sm:top-4 mx-auto transition-all duration-300",
        "rounded-[6px] backdrop-blur-md border border-white/40 shadow-lg",
        isScrolled
          ? "bg-white/70 py-1.5 sm:py-2"
          : "bg-white/90 py-2.5 sm:py-3",
        "max-w-7xl",
      )}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10">
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 cursor-pointer flex items-center"
          onClick={() => handleNav("/")}
        >
          <Image
            src="/assets/icon.png"
            alt="SnapTap Logo"
            width={60}
            height={60}
            priority
            className="object-contain max-h-[38px] sm:max-h-[48px] brightness-110"
          />
        </motion.div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex flex-1 items-center space-x-1 lg:space-x-4">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className={clsx(
                  "relative px-4 py-2 rounded-[6px] text-[15px] font-bold transition-all duration-300 overflow-hidden group",
                  isActive
                    ? "text-snaptap-blue-dark"
                    : "text-snaptap-gray-dark hover:text-snaptap-blue",
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-snaptap-blue/10 rounded-[6px]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-snaptap-blue/5 rounded-[6px] scale-0 group-hover:scale-100 transition-transform duration-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section / Auth */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {!isLoggedIn ? (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav("/app/login")}
                className="px-5 sm:px-7 py-2 text-[14px] sm:text-[15px] font-bold text-snaptap-blue-dark hover:text-snaptap-blue border-2 border-transparent transition-all"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#006080" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav("/app/sign-up")}
                className="bg-snaptap-blue-dark text-white text-[14px] sm:text-[15px] font-bold px-5 sm:px-8 py-2.5 rounded-[6px] shadow-lg shadow-snaptap-blue-dark/20 transition-all"
              >
                Join Now
              </motion.button>
            </div>
          ) : (
            <div className="relative" ref={userDropdownRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 group px-4 py-2 rounded-[6px] bg-snaptap-blue-dark/5 hover:bg-snaptap-blue-dark/10 transition-all border border-snaptap-blue-dark/10"
              >
                <div className="w-8 h-8 rounded-[6px] bg-snaptap-blue-dark flex items-center justify-center text-white shadow-md">
                  <Icon icon="solar:user-bold-duotone" width={20} />
                </div>
                <span className="hidden sm:inline font-bold text-sm text-snaptap-gray-dark group-hover:text-snaptap-blue-dark transition-colors">
                  {Admin?.username}
                </span>
                <Icon
                  icon="lucide:chevron-down"
                  width={16}
                  className={clsx(
                    "text-snaptap-gray-light transition-transform duration-300",
                    isUserDropdownOpen && "rotate-180",
                  )}
                />
              </motion.button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10, x: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10, x: 0 }}
                    className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[6px] border border-slate-100 p-2 z-[60] overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-[12px] font-bold text-snaptap-gray-light uppercase tracking-wider">
                        Account
                      </p>
                      <p className="text-sm font-bold text-snaptap-gray-dark truncate">
                        {Admin?.email}
                      </p>
                    </div>
                    {[
                      {
                        name: "Manage Profile",
                        icon: "solar:settings-bold-duotone",
                        path: "/app/manage-profile",
                      },
                      {
                        name: "Subscription",
                        icon: "solar:card-2-bold-duotone",
                        path: "/app/subscription-page",
                      },
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNav(item.path)}
                        className="w-full px-4 py-3 hover:bg-snaptap-blue/5 text-snaptap-gray-dark rounded-[6px] text-left flex items-center gap-3 transition-colors font-semibold group"
                      >
                        <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-snaptap-blue/10 text-snaptap-gray-light group-hover:text-snaptap-blue-dark transition-colors">
                          <Icon icon={item.icon} width={20} />
                        </div>
                        {item.name}
                      </button>
                    ))}
                    <div className="mt-1 pt-1 border-t border-slate-50">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 hover:bg-red-50 text-red-500 rounded-[6px] text-left flex items-center gap-3 transition-colors font-semibold group"
                      >
                        <div className="p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 text-red-400 group-hover:text-red-500 transition-colors">
                          <Icon icon="solar:logout-3-bold-duotone" width={20} />
                        </div>
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-[6px] bg-snaptap-blue-dark/5 text-snaptap-blue-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Icon
              icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"}
              width={24}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div
              ref={mobileDropdownRef}
              className="px-4 pb-6 pt-2 flex flex-col gap-2"
            >
              {visibleNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNav(item.path)}
                  className={clsx(
                    "text-left w-full font-bold px-5 py-3.5 rounded-[6px] transition-all flex items-center justify-between group",
                    pathname === item.path
                      ? "bg-snaptap-blue/10 text-snaptap-blue-dark"
                      : "hover:bg-slate-50 text-snaptap-gray-dark hover:text-snaptap-blue-dark",
                  )}
                >
                  {item.name}
                  <Icon
                    icon="lucide:chevron-right"
                    width={18}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
              {!isLoggedIn && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleNav("/app/login")}
                    className="font-bold px-4 py-3 text-snaptap-blue-dark text-center rounded-[6px] bg-snaptap-blue/10"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNav("/app/sign-up")}
                    className="font-bold px-4 py-3 text-white text-center rounded-[6px] bg-snaptap-blue-dark shadow-md"
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <Modal
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        footer={null}
        centered
        closable={false}
        width={360}
        className="[&_.ant-modal-content]:!rounded-[6px] [&_.ant-modal-content]:!p-0 overflow-hidden"
      >
        <div className="p-8 text-center text-slate-800">
          <div className="w-16 h-16 rounded-[6px] bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
            <Icon icon="majesticons:logout-line" width={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Confirm Logout</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Are you sure you want to end your session? You&apos;ll need to sign
            in again to access your inventory.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 h-12 rounded-[6px] border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="flex-1 h-12 rounded-[6px] bg-red-500 text-white font-bold hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </motion.nav>
  );
};

export default Navbar;
