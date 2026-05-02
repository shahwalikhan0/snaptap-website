import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Showcase | SnapTap",
  description:
    "Browse and experience products in Augmented Reality with SnapTap.",
};

export default function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
