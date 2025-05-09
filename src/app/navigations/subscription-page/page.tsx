"use client";

import { useState } from "react";
import SubscriptionComponent from "./subscription-component";
import MyPlan from "./my-plan";
import ChangePlan from "./change-plan";
import EditBilling from "./edit-billing";

export default function SubscriptionPage() {
  const [selectedPage, setSelectedPage] = useState("my-plan");

  const renderRightPanel = () => {
    switch (selectedPage) {
      case "change-plan":
        return <ChangePlan />;
      case "edit-billing":
        return <EditBilling />;
      default:
        return <MyPlan />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: "70px" }}>
      {/* Left Menu - 1/3 Width */}
      <div style={{ width: "33.33%", borderRight: "1px solid #e0e0e0" }}>
        <SubscriptionComponent
          selectedPage={selectedPage}
          onSelect={setSelectedPage}
        />
      </div>

      {/* Right Content - 2/3 Width */}
      <div style={{ width: "66.66%", backgroundColor: "#fff" }}>
        {renderRightPanel()}
      </div>
    </div>
  );
}
