import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "./hooks/useAdminContext";
// import "@google/model-viewer";

export const metadata: Metadata = {
  title: "SnapTap",
  description: "Snap. Tap. Experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProvider>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </AdminProvider>
  );
}
