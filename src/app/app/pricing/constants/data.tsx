import { FaRocket, FaCogs, FaBuilding } from "react-icons/fa";

export interface Plan {
  id: number;
  name: string;
  monthly_price: number;
  features: string[] | string;
  description?: string;
}

export const featuresMap: Record<number, string[]> = {
  1: [
    "Up to 20 products in inventory",
    "Standard 3D model generation",
    "QR code for each product",
    "Web-embeddable AR viewer",
    "Rs 1.20 per model view",
    "Basic inventory dashboard",
    "Email support",
  ],
  2: [
    "Up to 50 products in inventory",
    "High-fidelity 3D model generation",
    "QR codes + direct share links",
    "Web embed + API access",
    "Rs 1.00 per model view",
    "Advanced inventory management",
    "Analytics & conversion tracking",
    "Priority email & chat support",
  ],
  3: [
    "Up to 80 products in inventory",
    "Premium 3D model quality",
    "White-label AR viewer",
    "Full API & webhook access",
    "Rs 0.80 per model view",
    "Multi-user team accounts",
    "Custom integrations on request",
    "Dedicated account manager",
    "SLA-backed priority support",
  ],
};

export const getIcon = (id: number) => {
  switch (id) {
    case 1:
      return <FaRocket size={28} className="text-[#00A8DE]" />;
    case 2:
      return <FaCogs size={28} className="text-[#00A8DE]" />;
    case 3:
      return <FaBuilding size={28} className="text-[#00A8DE]" />;
    default:
      return <FaRocket size={28} className="text-[#00A8DE]" />;
  }
};
