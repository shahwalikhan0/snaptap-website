export const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "mdi:information-outline",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "mdi:rocket-launch-outline",
    children: [
      { id: "gs-signup", title: "Create an Account" },
      { id: "gs-verify", title: "Email Verification" },
      { id: "gs-plan", title: "Choose a Plan" },
      { id: "gs-ios", title: "iOS App Setup" },
    ],
  },
  {
    id: "scanning",
    title: "Scanning Products",
    icon: "mdi:cube-scan",
    children: [
      { id: "scan-requirements", title: "Device Requirements" },
      { id: "scan-tips", title: "Scanning Tips" },
      { id: "scan-upload", title: "Uploading to SnapTap" },
      { id: "scan-area-mode", title: "Area Mode (New)" },
    ],
  },
  {
    id: "processing",
    title: "Model Processing",
    icon: "mdi:swap-horizontal",
    children: [
      { id: "proc-pipeline", title: "The Processing Pipeline" },
      { id: "proc-notifications", title: "Notifications" },
      { id: "proc-qr", title: "QR Code Generation" },
    ],
  },
  {
    id: "inventory",
    title: "Inventory & Dashboard",
    icon: "mdi:buffer",
    children: [
      { id: "inv-manage", title: "Managing Products" },
      { id: "inv-embed", title: "Embedding AR Viewer" },
      { id: "inv-qr", title: "Using QR Codes" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Billing",
    icon: "mdi:chart-areaspline",
    children: [
      { id: "ana-views", title: "AR View Tracking" },
      { id: "ana-billing", title: "How Billing Works" },
      { id: "ana-plans", title: "Subscription Plans" },
    ],
  },
  {
    id: "customer",
    title: "Customer Experience",
    icon: "mdi:account-eye-outline",
  },
  {
    id: "faq",
    title: "FAQ",
    icon: "mdi:help-circle-outline",
  },
];

export const allIds = sections.flatMap((s) => [
  s.id,
  ...(s.children?.map((c) => c.id) ?? []),
]);
