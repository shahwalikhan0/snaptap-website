export const workflowSteps = [
  {
    step: "01",
    icon: "mdi:account-plus-outline",
    title: "Create Your Brand Account",
    desc: "Sign up as a seller, verify your email, and choose a subscription plan that matches how many products you plan to list. Plans scale from 10 to unlimited AR scans per month.",
  },
  {
    step: "02",
    icon: "mdi:cube-scan",
    title: "Scan with iPhone LiDAR",
    desc: "Use any iPhone Pro or Pro Max (iOS 18+) with the SnapTap iOS app to capture your physical product. The built-in LiDAR depth sensor records precise geometry, scale, and texture — no photography studio needed.",
  },
  {
    step: "03",
    icon: "mdi:cloud-upload-outline",
    title: "Upload & Auto-Process",
    desc: "The iOS app uploads your scanned model to SnapTap. Our backend automatically converts it to a web-compatible .GLB file, generates a branded QR code, and notifies you the moment your product is live.",
  },
  {
    step: "04",
    icon: "mdi:qrcode",
    title: "Deploy Your QR Code",
    desc: "Each product gets a unique QR code that links directly to an immersive AR viewer page. Print it on menus, price tags, packaging, shelf labels, or marketing materials — no app download needed by the customer.",
  },
  {
    step: "05",
    icon: "mdi:chart-timeline-variant",
    title: "Track Performance",
    desc: "Your dashboard shows real-time AR views per product, monthly billing based on view volume, scan quota remaining, and active vs. inactive product counts — all in one place.",
  },
];

export const platformCaps = [
  {
    icon: "mdi:cube-scan",
    title: "LiDAR-Powered 3D Scanning",
    desc: "Captures true depth, texture, and scale using iPhone Pro's built-in LiDAR sensor. Models are photorealistic and exact — not approximated.",
  },
  {
    icon: "mdi:swap-horizontal",
    title: "Automatic Model Conversion",
    desc: "The scanned model is automatically converted to web-standard format in the background.",
  },
  {
    icon: "mdi:qrcode-plus",
    title: "Auto-Generated QR Codes",
    desc: "Every product instantly gets a unique QR code hosted on SnapTap's CDN. No QR tools required — print it, embed it, or share it directly from your dashboard.",
  },
  {
    icon: "mdi:augmented-reality",
    title: "Cross-Platform AR Viewer",
    desc: "The AR experience works natively: iOS uses Quick Look for seamless AR, Android uses Google Scene Viewer, and desktop shows an interactive 3D viewer — all from the same link.",
  },
  {
    icon: "mdi:buffer",
    title: "Inventory Dashboard",
    desc: "Manage your entire AR product catalog from the SnapTap web dashboard. Toggle products active/inactive, update details, and monitor scan quotas — all from one screen.",
  },
  {
    icon: "mdi:bell-ring-outline",
    title: "Real-Time Notifications",
    desc: "Get notified when a product finishes processing, when conversion fails (with guidance to retry), and when customers leave feedback or ratings on your products.",
  },
  {
    icon: "mdi:web",
    title: "Embeddable AR Viewer",
    desc: "Each 3D model has a shareable URL you can iframe into any existing website or e-commerce store. Customers see and interact with the AR product without leaving your site.",
  },
  {
    icon: "mdi:chart-areaspline",
    title: "View-Based Analytics & Billing",
    desc: "Every QR scan and model view is tracked. Monthly billing reflects your subscription base plus per-view charges beyond your plan — transparent and predictable.",
  },
  {
    icon: "mdi:star-outline",
    title: "Customer Ratings & Feedback",
    desc: "Customers can rate and leave written feedback on products they've experienced in AR. Ratings appear on product listings and notify the brand, building trust and social proof.",
  },
];

export const useCases = [
  {
    icon: "mdi:storefront-outline",
    image: "/assets/marketplace.png",
    tag: "Marketplace",
    title: "Marketplace Platform",
    desc: "Brands scan and publish their products to the SnapTap marketplace. Customers browse AR-enabled listings, visualize items in their real space, and contact sellers directly — no intermediary, no guesswork.",
    sellerPoints: [
      "Publish listings to the SnapTap marketplace",
      "Reach customers actively exploring AR products",
      "Manage your catalog and toggle visibility anytime",
      "Receive direct customer inquiries from your listing",
    ],
    customerPoints: [
      "Browse AR-enabled products from multiple sellers",
      "See items true-to-scale in your own space",
      "Save favorites and compare before buying",
      "Message sellers directly without leaving the app",
    ],
  },
  {
    icon: "mdi:silverware-fork-knife",
    image: "/assets/dining_2.png",
    tag: "Restaurants",
    title: "Restaurant Menu Virtualization",
    desc: "Convert your entire food menu into photorealistic 3D AR models. Guests scan a QR code on the physical menu and see every dish rendered life-size on their table — improving ordering confidence, reducing returns, and boosting upsells.",
    sellerPoints: [
      "Scan each dish and add it to your AR menu",
      "QR codes auto-generated for every dish",
      "Print QR codes directly on physical menus or table cards",
      "Update menu items anytime from your dashboard",
    ],
    customerPoints: [
      "Scan the QR code on a printed menu",
      "See the dish rendered life-size before you order",
      "No app download needed — works in any mobile browser",
      "Make confident choices without wondering about portion size",
    ],
  },
  {
    icon: "mdi:briefcase-outline",
    image: "/assets/scan_view_3.png",
    tag: "Retail & E-Commerce",
    title: "Business Product Virtualization",
    desc: "Furniture stores, showrooms, retail brands, and e-commerce businesses convert their product catalogs into AR. Embed the AR viewer on your own website, or hand out QR codes in-store — no app download required by customers.",
    sellerPoints: [
      "Convert full product catalogs to AR models",
      "Embed the AR viewer directly into your e-commerce site",
      "Print QR codes for in-store shelf tags and marketing materials",
      "Works for furniture, decor, electronics, fashion, and more",
    ],
    customerPoints: [
      "Place furniture and décor to scale in your actual room",
      "See how a product fits your space before purchasing",
      "No special device — any modern iPhone or Android is enough",
      "Dramatically reduces purchase uncertainty and returns",
    ],
  },
];
