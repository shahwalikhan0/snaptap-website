"use client";

import { Input } from "antd";

import Navbar from "./navigations/components/navbar";

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
      <Input placeholder="Basic usage" variant="outlined" />
      <div>This is landing page</div>
    </>
  );
}
