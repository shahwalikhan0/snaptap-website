/**
 * Predefined product and brand categories
 * These categories are used across the application for consistent categorization
 */
export const CATEGORIES = [
  "Automotive",
  "Beauty & Personal Care",
  "Books & Stationery",
  "Commercial",
  "Construction & Interior",
  "Electronics",
  "Fashion",
  "Food & Grocery",
  "Footwear",
  "Furniture",
  "Home Decor",
  "Kids & Baby",
  "Lighting",
  "Outdoor",
  "Pets",
  "Sports & Fitness",
  "Others"
] as const;

export type Category = typeof CATEGORIES[number];
