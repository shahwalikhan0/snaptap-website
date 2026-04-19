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
    "3D model generation",
    "QR code for each product",
    "Direct share links for each product",
    "Web-embeddable AR viewer",
    "Rs 1.20 per model view",
    "Inventory dashboard",
    "Product Analytics",
    "Email support",
  ],
  2: [
    "Up to 50 products in inventory",
    "3D model generation",
    "QR code for each product",
    "Direct share links for each product",
    "Web-embeddable AR viewer",
    "Rs 1.00 per model view",
    "Inventory management",
    "Product Analytics",
    "Email support",
  ],
  3: [
    "Up to 80 products in inventory",
    "3D model generation",
    "QR code for each product",
    "Direct share links for each product",
    "Web-embeddable AR viewer",
    "Inventory management",
    "Product Analytics",
    "Rs 0.80 per model view",
    "Email support",
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
