"use client"; // Required for Next.js App Router

import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

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
      <div className="cursor-pointer" onClick={() => handleNav("/")}>
        <img
          src="/assets/icon.png"
          alt="Company Logo"
          className="w-14 h-14 rounded-full"
        />
      </div>

      <div className="flex space-x-19 ml-4">
        {" "}
        {NAVBAR_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNav(item.path)}
            className="relative font-bold text-white py-2 px-6 rounded-full border-2 border-transparent hover:border-white hover:bg-white hover:text-[#00A8DE] transition-all duration-300 ease-in-out"
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleNav("/search")}
          className="hover:text-[#333333]"
        >
          <FiSearch size={20} />
        </button>
        <button
          onClick={() => handleNav("/navigations/sign-up")}
          className="bg-white hover:bg-[#0091c2] text-[#00A8DE] px-4 py-2 rounded"
        >
          Start Free Trial
        </button>
        <button
          onClick={() =>
            handleNav(isLoggedIn ? "/login" : "/navigations/sign-up")
          }
          className="hover:underline"
        >
          {isLoggedIn ? "Login" : "Sign Up"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
