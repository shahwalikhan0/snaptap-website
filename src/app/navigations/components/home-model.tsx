"use client";
import "@google/model-viewer";
import React from "react";

const HomeModel = () => {
  return (
    <div className="relative w-full h-[500px]">
      {/* Darker shadow below the model */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-44 h-8 rounded-full bg-black opacity-40 blur-sm z-0" />

      {/* Model viewer */}
      {/* @ts-ignore */}
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        alt="A 3D model"
        auto-rotate
        camera-controls
        ar
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
