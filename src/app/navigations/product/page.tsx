"use client";

import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">What is SnapTap?</h1>
      <p className="text-lg mb-6">
        SnapTap is an innovative platform designed to revolutionize the online
        shopping experience. Using cutting-edge 3D scanning and AR technology,
        users can visualize products in real-time before making a purchase.
      </p>
      <p className="text-lg mb-6">
        Whether you're a business looking to showcase your inventory or a
        shopper exploring new products, SnapTap provides immersive and
        interactive product displays like never before.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => router.push("/free-trial")}
      >
        Start Free Trial
      </button>
    </div>
  );
}
