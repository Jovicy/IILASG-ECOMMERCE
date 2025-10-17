import { ProductStatus } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNaira = (amount: number): string => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(value)) return "₦0.00";

  return value.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });
};

export const calculateDiscountedPrice = (originalPrice: number, discountPercent: number): string => {
  if (isNaN(originalPrice) || isNaN(discountPercent)) return "₦0.00";

  const discountedPrice = originalPrice - (originalPrice * discountPercent) / 100;
  return formatNaira(discountedPrice);
};

export const formatStatus = (status: ProductStatus) => {
  return status
    .toLowerCase() // "under_review"
    .replace("_", " ") // "under review"
    .replace(/\b\w/g, (c) => c.toUpperCase()); // "Under Review"
};
