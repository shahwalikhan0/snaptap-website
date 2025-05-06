"use client";

import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();

  return (
    <div className="p-10 pt-32 bg-gray-50">
      {" "}
      {/* Increased padding-top here */}
      <section className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-5xl font-semibold text-center text-[#333] mb-6">
          What is SnapTap?
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-700 mb-8 text-center">
          SnapTap is an innovative platform designed to revolutionize the online
          shopping experience. Using cutting-edge 3D scanning and AR technology,
          users can visualize products in real-time before making a purchase.
        </p>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Whether you're a business looking to showcase your inventory or a
          shopper exploring new products, SnapTap provides immersive and
          interactive product displays like never before.
        </p>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-xl transition-all duration-300"
            onClick={() => router.push("/free-trial")}
          >
            Start Free Trial
          </button>
        </div>

        {/* Key Features */}
        <section className="bg-white p-10 rounded-xl shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-center text-[#333] mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Product Visualization",
                description:
                  "View products in 3D and AR before making your purchase.",
                icon: "/assets/feature1.jpg",
              },
              {
                title: "Seamless Integration",
                description: "Easily integrate with your eCommerce platform.",
                icon: "/assets/feature2.jpg",
              },
              {
                title: "Detailed Product Insights",
                description:
                  "Access in-depth analytics on customer interaction with products.",
                icon: "/assets/feature3.jpg",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-20 h-20 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-[#333] mb-6 text-center">
            Product Demo
          </h2>
          <div className="text-center">
            <img
              src="/assets/demo.jpg"
              alt="Product Demo"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
            <p className="mt-6 text-lg text-gray-700">
              Experience SnapTap in action and explore the potential for your
              business or personal shopping needs. Click on the button below to
              start your free trial and see it in real-time!
            </p>
          </div>
        </section>

        <section className="bg-white p-10 rounded-xl shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-center text-[#333] mb-6">
            Product Stats
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-center">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-6 py-4 text-xl">Feature</th>
                  <th className="px-6 py-4 text-xl">Go Plan</th>
                  <th className="px-6 py-4 text-xl">Pro Plan</th>
                  <th className="px-6 py-4 text-xl">Studio Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 text-gray-700">3D Modelers</td>
                  <td className="px-6 py-4 text-gray-700">iPad & Web</td>
                  <td className="px-6 py-4 text-gray-700">Web & Desktop</td>
                  <td className="px-6 py-4 text-gray-700">Desktop Only</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Cloud Storage</td>
                  <td className="px-6 py-4 text-gray-700">Unlimited</td>
                  <td className="px-6 py-4 text-gray-700">Unlimited</td>
                  <td className="px-6 py-4 text-gray-700">Unlimited</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Revit Import</td>
                  <td className="px-6 py-4 text-gray-700">No</td>
                  <td className="px-6 py-4 text-gray-700">No</td>
                  <td className="px-6 py-4 text-gray-700">Yes</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Price (Annual)</td>
                  <td className="px-6 py-4 text-gray-700">$119</td>
                  <td className="px-6 py-4 text-gray-700">$349</td>
                  <td className="px-6 py-4 text-gray-700">$749</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}
