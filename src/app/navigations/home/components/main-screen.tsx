"use client";

import Image from "next/image";
import { Button, Card, Avatar, Row, Col } from "antd";
import PricingPage from "../../pricing/pricing-component";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useRouter } from "next/navigation";
import Clients from "../../components/client";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(
  () => import("../../components/ModelViewerWrapper"),
  {
    ssr: false,
  }
);

export const MainScreen = () => {
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <Navbar />

      <section
        className="w-full flex flex-col items-center justify-center bg-white "
        style={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <div
          className="w-full h-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, rgb(244, 243, 243), rgb(175, 178, 184))",
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
                <ModelViewer />
              </div>
            </div>
          </div>

          {/* Right side - Text and Button */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4 mt-[-30px] md:mt-0 text-[#007cae]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Empower Your 3D Design Journey
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#007cae] mb-6">
              Experience intuitive modeling, real-time collaboration, and
              stunning visualizations.
            </p>
            <Button
              type="primary"
              size="large"
              className="rounded-full bg-[#007cae] text-white border border-transparent hover:bg-transparent hover:border-[#007cae] hover:text-[#007cae] hover:shadow-md hover:scale-105 transition-all duration-300"
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
      <section className="w-full py-10 bg-[radial-gradient(circle at 50% 70%, rgb(206, 206, 206), rgb(186, 186, 186))] px-6 ">
        <Row gutter={[32, 32]} justify="center">
          {[
            {
              src: "/assets/furniture_1.png",
              title: "3D Modeling",
              desc: "Create detailed and precise models of your products and publish them on our SnapTap marketplace.",
            },
            {
              src: "/assets/dining_2.png",
              title: "Collaboration",
              desc: "Partner up with SnapTap to give your customers a immersive experience.",
            },
            {
              src: "/assets/scan_view_3.png",
              title: "Visualization",
              desc: "View products in the comfort of your sofa with photorealistic rendering capabilities.",
            },
          ].map((feature, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <div className="text-center transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-[#007cae] to-[#4dcbe7] p-6 rounded-xl">
                <div className="w-full h-80 mx-auto mb-4 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-110">
                  <Image
                    src={feature.src}
                    alt={feature.title}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-white text-sm sm:text-base">
                  {feature.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="w-full py-20 bg-[radial-gradient(circle_at_50%_70%,_rgb(244,243,243),_rgb(171,174,180))] px-6"
      >
        <PricingPage />
      </section>

      <Clients />

      <section className="w-full bg-[radial-gradient(circle_at_50%_70%,_rgb(244,243,243),_rgb(171,174,180))]">
        {/* Testimonials Section */}
        <section className="py-20 px-6 text-[#007cae]">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              What Our Users Say
            </h2>
          </div>
          <Row gutter={[24, 24]} justify="center">
            {[
              {
                text: "This platform revolutionized our design process. The intuitive tools and collaborative features are unmatched.",
                name: "Alex Johnson",
                avatar: "/assets/user1.jpg",
              },
              {
                text: "The visualization tools helped us present our ideas more effectively to clients.",
                name: "Sonam Bajwa",
                avatar: "/assets/user2.jpeg",
              },
              {
                text: `"Collaborating with my team has never been easier. Real-time updates keep everyone on the same page."`,
                name: "Neelum Muneer",
                avatar: "/assets/user3.jpg",
              },
            ].map((user, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="shadow bg-gradient-to-br from-[#007cae] to-[#4dcbe7] text-white">
                  <p className="mb-4">{user.text}</p>
                  <div className="flex items-center justify-center">
                    <Avatar src={user.avatar} size={60} className="mr-3" />
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Call to Action Section */}
        <section className="flex justify-center items-center py-20 px-4">
          <div className="bg-gradient-to-br from-[#007cae] to-[#4dcbe7] text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 max-w-3xl w-full p-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Designs?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of professionals who trust our platform for their
              3D modeling needs.
            </p>
            <button
              onClick={() => handleNav("/navigations/sign-up")}
              className="relative font-bold bg-white text-[#00A8DE] py-2 px-6 rounded-full border-2 border-transparent hover:border-white hover:bg-[#00A8DE] hover:text-white transition-all duration-300 ease-in-out"
            >
              Start Free Trial
            </button>
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
};
