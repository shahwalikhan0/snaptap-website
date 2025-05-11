"use client";

import Image from "next/image";
import { Button, Card, Avatar, Row, Col } from "antd";
import PricingPage from "../../pricing/pricing-component";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useRouter } from "next/navigation";
import Clients from "../../components/client";
import HomeModel from "../../components/home-model";

export const MainScreen = () => {
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full overflow-x-hidden">
      <Navbar />

      <section
        className="w-full flex flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 sm:py-12 md:py-13"
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          // paddingTop: "30px",
        }}
      >
        <div
          className="w-full h-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, rgb(244, 243, 243), rgb(171, 174, 180))",
            borderRadius: "1rem",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 50px",
            width: "100%",
            maxWidth: "100%",
            height: "95vh",
            padding: 0,
          }}
        >
          {/* Left side - 3D Model */}
          <div className="w-full md:w-1/2 flex justify-center items-center mb-2 md:mb-0">
            <div className="relative w-full h-[250px] sm:h-[320px] md:h-[500px]">
              <div className="relative z-10 w-full h-full rounded-xl">
                <HomeModel />
              </div>
            </div>
          </div>

          {/* Right side - Text and Button */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4 mt-[-30px] md:mt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Empower Your 3D Design Journey
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">
              Experience intuitive modeling, real-time collaboration, and
              stunning visualizations.
            </p>
            <Button
              type="primary"
              size="large"
              className="rounded-full text-white"
              style={{
                backgroundColor: "#00A8DE",
                borderColor: "#00A8DE",
              }}
              onClick={() => {
                const pricingSection = document.getElementById("pricing");
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-10 bg-gray-100 px-6">
        <Row gutter={[32, 32]} justify="center">
          {[
            {
              src: "/assets/feature1.jpg",
              title: "3D Modeling",
              desc: "Craft detailed models with precision and ease using our robust toolset.",
            },
            {
              src: "/assets/feature2.jpg",
              title: "Visualization",
              desc: "Bring your designs to life with photorealistic rendering capabilities.",
            },
            {
              src: "/assets/feature3.jpg",
              title: "Collaboration",
              desc: "Work seamlessly with your team in real-time, from anywhere in the world.",
            },
          ].map((feature, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <div className="text-center transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white p-6 rounded-xl">
                <div className="w-full h-80 mx-auto mb-4 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-110">
                  <Image
                    src={feature.src}
                    alt={feature.title}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-20 bg-gray-100 px-6">
        <PricingPage />
      </section>

      <Clients />

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-white px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">What Our Users Say</h2>
        </div>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card className="shadow">
              <p className="text-gray-700 mb-4">
                "This platform revolutionized our design process. The intuitive
                tools and collaborative features are unmatched."
              </p>
              <div className="flex items-center justify-center">
                <Avatar src="/assets/user1.jpg" size={60} className="mr-3" />
                <span className="text-gray-800 font-semibold">
                  Alex Johnson
                </span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="shadow">
              <p className="text-gray-700 mb-4">
                "The visualization tools helped us present our ideas more
                effectively to clients."
              </p>
              <div className="flex items-center justify-center">
                <Avatar src="/assets/user2.jpeg" size={60} className="mr-3" />
                <span className="text-gray-800 font-semibold">Sonam Bajwa</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="shadow">
              <p className="text-gray-700 mb-4">
                "Collaborating with my team has never been easier. Real-time
                updates keep everyone on the same page."
              </p>
              <div className="flex items-center justify-center">
                <Avatar src="/assets/user3.jpg" size={60} className="mr-3" />
                <span className="text-gray-800 font-semibold">
                  Neelum Muneer
                </span>
              </div>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="w-full flex justify-center items-center py-20 bg-gray-100 px-4">
        <div className="bg-[#00A8DE] text-white rounded-2xl shadow-xl max-w-3xl w-full p-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Designs?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of professionals who trust our platform for their 3D
            modeling needs.
          </p>
          <button
            onClick={() => handleNav("/navigations/sign-up")}
            className="relative font-bold bg-white text-[#00A8DE] py-2 px-6 rounded-full border-2 border-transparent hover:border-white hover:bg-[#00A8DE] hover:text-white transition-all duration-300 ease-in-out"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
