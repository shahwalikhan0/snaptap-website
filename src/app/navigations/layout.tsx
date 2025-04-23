import type { Metadata } from "next";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "SnapTap",
  description: "A simple and fast way to share your screen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
