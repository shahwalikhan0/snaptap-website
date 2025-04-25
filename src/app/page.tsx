"use client";

import Footer from "./navigations/components/footer";
import Navbar from "./navigations/components/navbar";
import { MainScreen } from "./navigations/home/components/main-screen";
// import { Pricing } from "./navigations/pricing/page";
// import { useEffect } from "react";
// import Navbar from "./navigations/components/navbar";

export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // const token = localStorage.getItem("token");
  //   // if (token) {
  //   setIsLoggedIn(true);
  //   // }
  // }, []);

  return (
    <>
      <Navbar isLoggedIn={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <MainScreen />
      </div>
      <Footer />
    </>
  );
}
