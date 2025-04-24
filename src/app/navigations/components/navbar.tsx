"use client"; // Required for Next.js App Router

import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi"; // Importing search icon

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  const NAVBAR_ITEMS = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Product", path: "/product" },
    { name: "Favourites", path: "/favourites" },
  ];

  const handleNav = (path: string) => {
    router.push(path); // Navigate to the path
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="cursor-pointer ml-2.5" onClick={() => handleNav("/")}>
        <img
          src="/assets/icon.png"
          alt="Company Logo"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div className="flex flex-grow justify-evenly">
        {NAVBAR_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNav(item.path)}
            className="relative font-bold text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleNav("/search")}
          className="ml-2.5 hover:text-gray-400"
        >
          <FiSearch size={20} />
        </button>
        <button
          onClick={() => handleNav("/free-trial")}
          className="ml-2.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start Free Trial
        </button>
        <button
          onClick={() => handleNav(isLoggedIn ? "/login" : "/register")}
          className="ml-2.5 hover:underline"
        >
          {isLoggedIn ? "Login" : "Sign Up"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
