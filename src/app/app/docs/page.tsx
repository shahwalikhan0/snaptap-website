"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: "introduction", title: "Introduction", icon: "material-symbols:info-outline" },
    { id: "getting-started", title: "Getting Started", icon: "material-symbols:rocket-launch-outline" },
    { id: "admin-dashboard", title: "Admin Dashboard", icon: "material-symbols:dashboard-outline" },
    { id: "product-management", title: "Product Management", icon: "material-symbols:inventory-2-outline" },
    { id: "model-requirements", title: "Model Requirements", icon: "material-symbols:3d-rotation" },
    { id: "technical-architecture", title: "Technical Architecture", icon: "material-symbols:architecture-outline" },
    { id: "model-quality", title: "Model Quality", icon: "material-symbols:high-quality-outline" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#f0f9ff] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#00A8DE] text-white p-4 rounded-full shadow-2xl hover:bg-[#007a9d] transition"
          >
            <Icon icon={isSidebarOpen ? "material-symbols:close" : "material-symbols:menu"} width={24} />
          </button>

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className={`
              fixed lg:sticky top-24 left-0 h-[calc(100vh-6rem)] w-64 bg-white/80 backdrop-blur-lg
              border border-white/30 rounded-2xl shadow-xl p-6 overflow-y-auto z-40
              transition-transform duration-300 lg:translate-x-0
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <h2 className="text-2xl font-bold text-[#00A8DE] mb-6">Documentation</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3
                    ${activeSection === section.id
                      ? "bg-[#00A8DE] text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon icon={section.icon} width={20} />
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 lg:p-12">
            {/* Introduction */}
            <section id="introduction" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-[#00A8DE] mb-6">
                  SnapTap Documentation
                </h1>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Welcome to the SnapTap documentation. SnapTap is an innovative AR-powered e-commerce platform
                    that bridges the gap between physical and digital shopping experiences using advanced
                    photogrammetry and augmented reality technologies.
                  </p>
                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">What is SnapTap?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    SnapTap revolutionizes e-commerce by enabling users to interact with realistic 3D models of
                    products, providing them with a more informed and immersive decision-making process. By integrating
                    photogrammetry to create high-quality 3D models and AR to visualize these models in real-world
                    settings, SnapTap empowers consumers to evaluate products comprehensively before purchase.
                  </p>
                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Core Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>3D model generation using photogrammetry technology</li>
                    <li>Augmented reality product visualization</li>
                    <li>Admin dashboard for brand and product management</li>
                    <li>Flexible subscription plans for different business needs</li>
                    <li>High-quality model conversion and optimization</li>
                    <li>Cross-platform support (iOS app and web)</li>
                  </ul>
                </div>
              </motion.div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#00A8DE] mb-6">Getting Started</h2>
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-semibold text-[#007a9d] mb-4">Admin Signup</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To get started with SnapTap as a brand administrator:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                    <li>Navigate to the Sign Up page from the website</li>
                    <li>Fill in your brand information including:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>Brand name and username</li>
                        <li>Email address (verification required)</li>
                        <li>Password and contact information</li>
                        <li>Brand category (e.g., Furniture, Fashion, Electronics)</li>
                        <li>Business description and location</li>
                      </ul>
                    </li>
                    <li>Upload a brand logo (optional but recommended)</li>
                    <li>Select a subscription plan (or start with a free trial)</li>
                    <li>Verify your email address via the verification link sent to your inbox</li>
                    <li>Once verified, log in to access your admin dashboard</li>
                  </ol>
                  
                  <div className="bg-blue-50 border-l-4 border-[#00A8DE] p-4 my-6">
                    <p className="text-sm text-gray-700">
                      <strong className="text-[#00A8DE]">Note:</strong> Email verification is required before you can
                      log in and start using the platform. The verification link expires after 15 minutes.
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Profile Setup</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    After signing up, you can manage your brand profile from the dashboard:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Update brand information and logo</li>
                    <li>Modify contact details and business description</li>
                    <li>Change your password</li>
                    <li>View and manage your subscription</li>
                  </ul>
                </div>
              </motion.div>
            </section>

            {/* Admin Dashboard */}
            <section id="admin-dashboard" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#00A8DE] mb-6">Admin Dashboard</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The admin dashboard is your central hub for managing your brand presence on SnapTap.
                  </p>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mb-4">Dashboard Features</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-[#00A8DE]/10 to-[#007a9d]/10 p-6 rounded-xl border border-[#00A8DE]/20">
                      <h4 className="text-xl font-semibold text-[#00A8DE] mb-3 flex items-center gap-2">
                        <Icon icon="material-symbols:inventory-2-outline" width={24} />
                        Inventory Management
                      </h4>
                      <p className="text-gray-700 text-sm">
                        View, edit, and manage all your products. Upload new products and track 3D model
                        conversion status.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#00A8DE]/10 to-[#007a9d]/10 p-6 rounded-xl border border-[#00A8DE]/20">
                      <h4 className="text-xl font-semibold text-[#00A8DE] mb-3 flex items-center gap-2">
                        <Icon icon="fluent:payment-28-regular" width={24} />
                        Subscription Management
                      </h4>
                      <p className="text-gray-700 text-sm">
                        View your current plan, upgrade or downgrade, and manage billing information.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#00A8DE]/10 to-[#007a9d]/10 p-6 rounded-xl border border-[#00A8DE]/20">
                      <h4 className="text-xl font-semibold text-[#00A8DE] mb-3 flex items-center gap-2">
                        <Icon icon="material-symbols:person" width={24} />
                        Profile Management
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Update your brand information, logo, contact details, and account settings.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#00A8DE]/10 to-[#007a9d]/10 p-6 rounded-xl border border-[#00A8DE]/20">
                      <h4 className="text-xl font-semibold text-[#00A8DE] mb-3 flex items-center gap-2">
                        <Icon icon="material-symbols:notifications-outline" width={24} />
                        Notifications
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Receive updates on model conversion status and system notifications.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Product Management */}
            <section id="product-management" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#00A8DE] mb-6">Product Management</h2>
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-semibold text-[#007a9d] mb-4">Uploading Products</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    SnapTap uses your scanned 3D models to create interactive AR experiences. Here's how to upload products:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                    <li>Navigate to the Inventory page in your dashboard</li>
                    <li>Click "Add New Product" or similar action button</li>
                    <li>Fill in product details:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li>Product name and description</li>
                        <li>Product category</li>
                        <li>Price and availability</li>
                        <li>Additional specifications</li>
                      </ul>
                    </li>
                    <li>Upload the 3D model file (.usdz format from the iOS scanning app)</li>
                    <li>The system will automatically convert your model to web-compatible formats</li>
                    <li>You'll receive a notification once the conversion is complete</li>
                  </ol>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                    <p className="text-sm text-gray-700">
                      <strong className="text-yellow-700">Important:</strong> 3D models are scanned using the iOS
                      SnapTap scanning application. Make sure to follow the scanning guidelines for best results.
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">3D Model Generation Process</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    SnapTap uses advanced photogrammetry techniques to create high-quality 3D models:
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 my-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#00A8DE] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Scanning with iOS App</h4>
                          <p className="text-gray-600 text-sm">Use the SnapTap iOS app to scan your product from multiple angles using your iPhone's depth sensor.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-[#00A8DE] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Model Upload</h4>
                          <p className="text-gray-600 text-sm">Upload the generated .usdz file through the admin dashboard along with product information.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-[#00A8DE] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Server Processing</h4>
                          <p className="text-gray-600 text-sm">The SnapTap model service converts your model to web-compatible formats (.glb) for AR viewing.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-[#00A8DE] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Ready for AR</h4>
                          <p className="text-gray-600 text-sm">Once processed, your product is available for AR visualization on both iOS and web platforms.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Model Requirements */}
            <section id="model-requirements" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#00A8DE] mb-6">Model Requirements</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    To ensure the highest quality 3D models, follow these guidelines when scanning products:
                  </p>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mb-4">Lighting Conditions</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Proper lighting is crucial for high-quality 3D model generation:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Use uniform, diffused lighting to avoid harsh shadows</li>
                    <li>Avoid direct sunlight or strong overhead lights</li>
                    <li>Ensure consistent lighting throughout the scanning process</li>
                    <li>Natural daylight or well-distributed artificial lighting works best</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Frame Count</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The number of frames captured affects model accuracy:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li><strong>Minimum:</strong> 60 frames for basic models</li>
                    <li><strong>Recommended:</strong> 120+ frames for high-quality models</li>
                    <li><strong>Note:</strong> More frames generally result in better texture and detail</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Camera Movement</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Slow and steady camera movement is essential:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Move slowly and steadily around the object</li>
                    <li>Follow the on-screen guidance in the scanning app</li>
                    <li>Capture the object from multiple angles and heights</li>
                    <li>Ensure adequate overlap between consecutive frames</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Object Complexity</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different objects produce varying quality results:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li><strong>Best results:</strong> Objects with matte surfaces and simple textures</li>
                    <li><strong>Challenging:</strong> Highly reflective, transparent, or very dark objects</li>
                    <li><strong>Complex objects:</strong> Items with intricate details may require more frames</li>
                  </ul>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                    <p className="text-sm text-gray-700">
                      <strong className="text-green-700">Pro Tip:</strong> For best results, place the object on a
                      neutral, non-reflective surface and ensure the background is simple and uncluttered.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Technical Architecture */}
            <section id="technical-architecture" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#00A8DE] mb-6">Technical Architecture</h2>
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-semibold text-[#007a9d] mb-4">System Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    SnapTap is built on a modern, scalable architecture consisting of multiple components:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-[#00A8DE] mb-3">Frontend</h4>
                      <ul className="text-gray-700 text-sm space-y-2">
                        <li><strong>Website:</strong> Next.js, React, TypeScript</li>
                        <li><strong>Styling:</strong> Tailwind CSS, Framer Motion</li>
                        <li><strong>3D Viewer:</strong> Three.js, Model Viewer</li>
                        <li><strong>iOS App:</strong> Swift, RealityKit, ARKit</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-[#00A8DE] mb-3">Backend</h4>
                      <ul className="text-gray-700 text-sm space-y-2">
                        <li><strong>Server:</strong> Node.js, Express</li>
                        <li><strong>Database:</strong> MySQL</li>
                        <li><strong>Model Service:</strong> Python (conversion service)</li>
                        <li><strong>Storage:</strong> File system for 3D models</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Key Technologies</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-[#00A8DE] pl-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Photogrammetry</h4>
                      <p className="text-gray-600 text-sm">
                        Uses Apple's Object Capture framework to create high-fidelity 3D models from 2D images
                        captured with the iPhone's depth sensor.
                      </p>
                    </div>
                    <div className="border-l-4 border-[#00A8DE] pl-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Augmented Reality</h4>
                      <p className="text-gray-600 text-sm">
                        ARKit and Model Viewer enable realistic product visualization in real-world environments
                        on both iOS and web platforms.
                      </p>
                    </div>
                    <div className="border-l-4 border-[#00A8DE] pl-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Model Conversion</h4>
                      <p className="text-gray-600 text-sm">
                        Automated conversion service transforms iOS .usdz files to web-compatible .glb format
                        for cross-platform compatibility.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Database Schema</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The system uses a MySQL database with the following main tables:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>brand:</strong> Stores brand/admin account information</li>
                    <li><strong>brand_detail:</strong> Extended brand information including subscription details</li>
                    <li><strong>product:</strong> Product catalog with model file references</li>
                    <li><strong>package:</strong> Available subscription plans</li>
                    <li><strong>category:</strong> Product and brand categorization</li>
                  </ul>
                </div>
              </motion.div>
            </section>

            {/* Model Quality */}
            <section id="model-quality" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#00A8DE] mb-6">Model Quality</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Several factors influence the quality of generated 3D models. Understanding these can help you
                    achieve the best results.
                  </p>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mb-4">Key Quality Factors</h3>
                  <div className="space-y-6 mb-8">
                    <div className="bg-gradient-to-r from-[#00A8DE]/5 to-transparent border-l-4 border-[#00A8DE] p-6 rounded-r-lg">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Icon icon="material-symbols:light-mode-outline" width={24} className="text-[#00A8DE]" />
                        Lighting Quality
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Consistent, diffused lighting produces the most accurate colors and textures. Avoid harsh
                        shadows and extreme contrasts.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#00A8DE]/5 to-transparent border-l-4 border-[#00A8DE] p-6 rounded-r-lg">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Icon icon="material-symbols:camera-outline" width={24} className="text-[#00A8DE]" />
                        Image Resolution
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Higher resolution cameras capture more detail, resulting in more accurate and detailed 3D models.
                        Use the highest quality camera settings available.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#00A8DE]/5 to-transparent border-l-4 border-[#00A8DE] p-6 rounded-r-lg">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Icon icon="material-symbols:video-camera-front-outline" width={24} className="text-[#00A8DE]" />
                        Frame Overlap
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Adequate overlap between consecutive frames is crucial for accurate depth estimation and
                        texture mapping. Move slowly and steadily during scanning.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#00A8DE]/5 to-transparent border-l-4 border-[#00A8DE] p-6 rounded-r-lg">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Icon icon="material-symbols:category-outline" width={24} className="text-[#00A8DE]" />
                        Object Surface
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Matte, textured surfaces produce better results than highly reflective or transparent objects.
                        Consider the object's material properties when scanning.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#007a9d] mt-8 mb-4">Best Practices</h3>
                  <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>Capture at least 120 frames for complex objects</li>
                    <li>Ensure consistent lighting throughout the entire scanning process</li>
                    <li>Move the camera slowly and maintain steady motion</li>
                    <li>Scan from multiple heights and angles for complete coverage</li>
                    <li>Use a neutral, non-reflective background</li>
                    <li>Avoid scanning in direct sunlight or with changing light conditions</li>
                    <li>Keep the object stationary during the entire scanning process</li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                    <h4 className="text-lg font-semibold text-[#00A8DE] mb-3">Experimental Results</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Testing has shown that models generated with 120+ frames in optimal lighting conditions
                      achieve over 90% accuracy compared to the original object.
                    </p>
                    <p className="text-gray-700 text-sm">
                      User feedback confirms high satisfaction with model texture quality and detail, validating
                      SnapTap's approach for real-world e-commerce applications.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
