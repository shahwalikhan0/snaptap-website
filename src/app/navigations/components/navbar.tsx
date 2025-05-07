"use client"; // Required for Next.js App Router

import { useRouter } from "next/navigation";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  const NAVBAR_ITEMS = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/navigations/pricing" },
    { name: "Product", path: "/navigations/product" },
  ];

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-[#00A8DE] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Left Side: Logo + Nav Items */}
      <div className="flex items-center space-x-11">
        <div className="cursor-pointer" onClick={() => handleNav("/")}>
          <img
            src="/assets/icon.png"
            alt="Company Logo"
            className="w-14 h-14 rounded-full"
          />
        </div>

        <div className="flex space-x-1">
          {NAVBAR_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNav(item.path)}
              className="relative font-bold text-white py-1.5 px-9 rounded-full border-2 border-transparent hover:border-white hover:bg-white hover:text-[#00A8DE] transition-all duration-300 ease-in-out"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Trial + Login */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleNav("/navigations/sign-up")}
          className="relative font-bold bg-white text-[#00A8DE] py-1.5 px-4 rounded-full border-2 border-transparent hover:border-white hover:bg-[#00A8DE] hover:text-white transition-all duration-300 ease-in-out"
        >
          Start Free Trial
        </button>
        <button
          onClick={() =>
            handleNav(isLoggedIn ? "/login" : "/navigations/login")
          }
          className="relative font-bold text-white py-1.5 px-4 rounded-full border-2 border-transparent hover:border-white hover:bg-white hover:text-[#00A8DE] transition-all duration-300 ease-in-out"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
