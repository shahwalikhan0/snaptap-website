import type { Metadata } from "next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "SnapTap",
  description: "A simple and fast way to share your screen",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div>
//       <Navbar />
//       {children}
//       <Footer />
//     </div>
//   );
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-[112px]">{children}</main>
      <Footer />
    </div>
  );
}
