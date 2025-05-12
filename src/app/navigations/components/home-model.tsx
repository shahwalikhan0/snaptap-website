"use client";
import "@google/model-viewer";
import React from "react";

const HomeModel = () => {
  return (
    <div className="relative w-full h-[470px] sm:h-[500px] mt-10 md:mt-0">
      {/* Round, darker shadow below the model */}

      {/* Model viewer */}
      {/* @ts-ignore */}
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb"
        alt="A 3D model"
        auto-rotate
        camera-controls
        ar
        environment-image="neutral"
        shadow-intensity="1"
        shadow-softness="1"
        className="relative z-10 w-full h-full"
        style={{
          backgroundColor: "transparent",
          borderRadius: "1rem",
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default HomeModel;
