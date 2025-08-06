// Import category images properly
import fashion from "@/assets/categories/fashion.jpg";
import food from "@/assets/categories/food.jpg";
import home from "@/assets/categories/home.jpg";
import electronics from "@/assets/categories/electronics.jpg";
import health from "@/assets/categories/health.jpg";
import baby from "@/assets/categories/baby.jpg";
import arts from "@/assets/categories/arts.jpg";
import services from "@/assets/categories/services.jpg";
import car from "@/assets/categories/automobile.jpg";
import farming from "@/assets/categories/farming.jpg";

// Products
import headphone from "@/assets/products/headphone.png";
import iphone from "@/assets/products/iphone.png";
import otherHead from "@/assets/products/otherhead.png";
import airpod from "@/assets/products/airpod.png";
import axe from "@/assets/products/axe.png";

// Forum Images
import forum1 from "@/assets/forum-1.svg";
import forum2 from "@/assets/forum-2.svg";
import forum3 from "@/assets/forum-3.svg";
import forum4 from "@/assets/forum-4.svg";
import forum5 from "@/assets/forum-5.svg";
import forum6 from "@/assets/forum-6.svg";
import forum7 from "@/assets/forum-7.svg";

// Export categories array
export const categories = [
  {
    name: "Fashion & Wearables",
    image: fashion,
  },
  {
    name: "Food & Groceries",
    image: food,
  },
  {
    name: "Home & Living",
    image: home,
  },
  {
    name: "Electronics & Gadgets",
    image: electronics,
  },
  {
    name: "Health & Wellness",
    image: health,
  },
  {
    name: "Baby & Kids",
    image: baby,
  },
  {
    name: "Arts & Culture",
    image: arts,
  },
  {
    name: "Services",
    image: services,
  },
  {
    name: "Automobiles",
    image: car,
  },
  {
    name: "Farming & Agriculture",
    image: farming,
  },
];

export const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphone",
    image: headphone,
    price: 95000,
    rating: 5.0,
    reviews: 500,
  },
  {
    id: 2,
    name: "Wireless Headphone",
    image: otherHead,
    price: 95000,
    rating: 5.0,
    reviews: 500,
  },
  {
    id: 3,
    name: "iPhone 16",
    image: iphone,
    price: 1100000,
    rating: 5.0,
    reviews: 600,
    discount: 30,
  },
  {
    id: 4,
    name: "Apple airpod",
    image: airpod,
    price: 150000,
    rating: 5.0,
    reviews: 3200,
    discount: 30,
  },
  {
    id: 5,
    name: "Axe Body Spray",
    image: axe,
    price: 15000,
    rating: 5.0,
    reviews: 2100,
    discount: 30,
  },
];

export const recentProducts = [
  {
    id: 6,
    name: "Wireless Headphone",
    image: headphone,
    price: 95000,
    rating: 5.0,
    reviews: 500,
  },
  {
    id: 7,
    name: "Wireless Headphone",
    image: otherHead,
    price: 95000,
    rating: 5.0,
    reviews: 500,
  },
  {
    id: 8,
    name: "iPhone 16",
    image: iphone,
    price: 1100000,
    rating: 5.0,
    reviews: 600,
    discount: 30,
  },
  {
    id: 9,
    name: "Apple airpod",
    image: airpod,
    price: 150000,
    rating: 5.0,
    reviews: 3200,
    discount: 30,
  },
  {
    id: 10,
    name: "Axe Body Spray",
    image: axe,
    price: 15000,
    rating: 5.0,
    reviews: 2100,
    discount: 30,
  },
];

export const bestSellers = [
  {
    id: 11,
    name: "Wireless Headphone",
    image: headphone,
    price: 95000,
    rating: 5.0,
    reviews: 500,
  },
  {
    id: 12,
    name: "Wireless Headphone",
    image: otherHead,
    price: 95000,
    rating: 5.0,
    reviews: 500,
  },
  {
    id: 13,
    name: "iPhone 16",
    image: iphone,
    price: 1100000,
    rating: 5.0,
    reviews: 600,
    discount: 30,
  },
  {
    id: 14,
    name: "Apple airpod",
    image: airpod,
    price: 150000,
    rating: 5.0,
    reviews: 3200,
    discount: 30,
  },
  {
    id: 15,
    name: "Axe Body Spray",
    image: axe,
    price: 15000,
    rating: 5.0,
    reviews: 2100,
    discount: 30,
  },
];

export const sampleOrders = [
  {
    id: "A1B2C3D4",
    date: "June 12, 2025",
    time: "9:15 AM",
    products: 2,
    qty: 1,
    total: 74500,
    status: "processing",
    activity: [
      { date: "May 23, 2025", status: "Order placed", isGrey: true },
      { date: "May 24, 2025", status: "Shipped from warehouse", isGrey: true },
      { date: "May 25, 2025", status: "Out for delivery", isGrey: false },
    ],
  },
  {
    id: "D8F7G6H5",
    date: "July 3, 2025",
    time: "4:45 PM",
    products: 5,
    qty: 7,
    total: 389900,
    status: "shipped",
    activity: [
      { date: "July 1, 2025", status: "Order placed", isGrey: true },
      { date: "July 2, 2025", status: "Packed", isGrey: true },
      { date: "July 3, 2025", status: "Shipped from warehouse", isGrey: false },
    ],
  },
  {
    id: "Z9Y8X7W6",
    date: "May 20, 2025",
    time: "11:30 AM",
    products: 1,
    qty: 2,
    total: 20500,
    status: "delivered",
    activity: [
      { date: "May 17, 2025", status: "Order placed", isGrey: true },
      { date: "May 18, 2025", status: "Packed", isGrey: true },
      { date: "May 19, 2025", status: "Out for delivery", isGrey: true },
      { date: "May 20, 2025", status: "Delivered", isGrey: false },
    ],
  },
  {
    id: "Q1W2E3R4",
    date: "July 1, 2025",
    time: "6:00 PM",
    products: 4,
    qty: 10,
    total: 950000,
    status: "shipped",
    activity: [
      { date: "June 29, 2025", status: "Order placed", isGrey: true },
      { date: "June 30, 2025", status: "Packed", isGrey: true },
      { date: "July 1, 2025", status: "Shipped", isGrey: false },
    ],
  },
  {
    id: "T5Y6U7I8",
    date: "April 8, 2025",
    time: "8:00 AM",
    products: 6,
    qty: 6,
    total: 612000,
    status: "processing",
    activity: [
      { date: "April 6, 2025", status: "Order placed", isGrey: true },
      { date: "April 7, 2025", status: "Processing", isGrey: false },
    ],
  },
  {
    id: "M9N8B7V6",
    date: "June 29, 2025",
    time: "2:10 PM",
    products: 3,
    qty: 5,
    total: 350000,
    status: "delivered",
    activity: [
      { date: "June 26, 2025", status: "Order placed", isGrey: true },
      { date: "June 27, 2025", status: "Packed", isGrey: true },
      { date: "June 28, 2025", status: "Out for delivery", isGrey: true },
      { date: "June 29, 2025", status: "Delivered", isGrey: false },
    ],
  },
  {
    id: "K3J2H1G4",
    date: "July 25, 2025",
    time: "1:55 PM",
    products: 2,
    qty: 3,
    total: 105000,
    status: "processing",
    activity: [
      { date: "July 24, 2025", status: "Order placed", isGrey: true },
      { date: "July 25, 2025", status: "Processing", isGrey: false },
    ],
  },
  {
    id: "U7Y6T5R4",
    date: "June 5, 2025",
    time: "10:05 AM",
    products: 8,
    qty: 8,
    total: 890000,
    status: "delivered",
    activity: [
      { date: "June 2, 2025", status: "Order placed", isGrey: true },
      { date: "June 3, 2025", status: "Packed", isGrey: true },
      { date: "June 4, 2025", status: "Out for delivery", isGrey: true },
      { date: "June 5, 2025", status: "Delivered", isGrey: false },
    ],
  },
  {
    id: "X1C2V3B4",
    date: "May 15, 2025",
    time: "7:45 AM",
    products: 1,
    qty: 1,
    total: 35000,
    status: "shipped",
    activity: [
      { date: "May 13, 2025", status: "Order placed", isGrey: true },
      { date: "May 14, 2025", status: "Packed", isGrey: true },
      { date: "May 15, 2025", status: "Shipped", isGrey: false },
    ],
  },
  {
    id: "L0P9O8I7",
    date: "July 10, 2025",
    time: "5:30 PM",
    products: 10,
    qty: 15,
    total: 1205000,
    status: "delivered",
    activity: [
      { date: "July 7, 2025", status: "Order placed", isGrey: true },
      { date: "July 8, 2025", status: "Packed", isGrey: true },
      { date: "July 9, 2025", status: "Out for delivery", isGrey: true },
      { date: "July 10, 2025", status: "Delivered", isGrey: false },
    ],
  },
];

export const pointsRecord = [
  {
    date: "10 mins ago",
    type: "used",
    points: -400,
    description: "Shopping Points Used",
    remaining: 500,
  },
  {
    date: "1 hour ago",
    type: "earned",
    points: 100,
    description: "Shopping Points Earned",
    remaining: 800,
  },
  {
    date: "2 hours ago",
    type: "earned",
    points: 300,
    description: "Referral Bonus Earned",
    remaining: 700,
  },
  {
    date: "3 hours ago",
    type: "used",
    points: -200,
    description: "Shopping Points Used",
    remaining: 400,
  },
  {
    date: "Yesterday",
    type: "earned",
    points: 150,
    description: "Shopping Points Earned",
    remaining: 600,
  },
  {
    date: "2 days ago",
    type: "used",
    points: -100,
    description: "Redeemed for Discount",
    remaining: 450,
  },
  {
    date: "3 days ago",
    type: "earned",
    points: 250,
    description: "Shopping Points Earned",
    remaining: 550,
  },
  {
    date: "Last week",
    type: "used",
    points: -150,
    description: "Shopping Points Used",
    remaining: 300,
  },
];

export const forums = [
  // Your Forums (5)
  {
    id: "1",
    name: "Frontend Builders",
    image: forum1,
    members: 124,
    createdBy: "currentUser",
    joined: true,
  },
  {
    id: "2",
    name: "Web Warriors",
    image: forum2,
    members: 88,
    createdBy: "currentUser",
    joined: true,
  },
  {
    id: "3",
    name: "CSS Creators",
    image: forum3,
    members: 76,
    createdBy: "currentUser",
    joined: true,
  },
  {
    id: "4",
    name: "Fullstack Circle",
    image: forum4,
    members: 143,
    createdBy: "currentUser",
    joined: true,
  },
  {
    id: "5",
    name: "DevTalk Nigeria",
    image: forum5,
    members: 97,
    createdBy: "currentUser",
    joined: true,
  },

  // Joined Forums (9)
  {
    id: "6",
    name: "React Nigeria",
    image: forum6,
    members: 98,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "7",
    name: "JavaScript Minds",
    image: forum7,
    members: 110,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "8",
    name: "Typescript Zone",
    image: forum1,
    members: 64,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "9",
    name: "Next.js Lounge",
    image: forum2,
    members: 102,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "10",
    name: "Tech Lagos",
    image: forum3,
    members: 140,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "11",
    name: "NodeJS Core",
    image: forum4,
    members: 86,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "12",
    name: "Tailwind Ninjas",
    image: forum5,
    members: 121,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "13",
    name: "UX Flow",
    image: forum6,
    members: 93,
    createdBy: "anotherUser",
    joined: true,
  },
  {
    id: "14",
    name: "Web3 Gurus",
    image: forum7,
    members: 77,
    createdBy: "anotherUser",
    joined: true,
  },

  // Explore Forums (6)
  {
    id: "15",
    name: "Svelte Society",
    image: forum1,
    members: 59,
    createdBy: "anotherUser",
    joined: false,
  },
  {
    id: "16",
    name: "Open Source Africa",
    image: forum2,
    members: 83,
    createdBy: "anotherUser",
    joined: false,
  },
  {
    id: "17",
    name: "Figma Friends",
    image: forum3,
    members: 112,
    createdBy: "anotherUser",
    joined: false,
  },
  {
    id: "18",
    name: "Product Design Lab",
    image: forum4,
    members: 96,
    createdBy: "anotherUser",
    joined: false,
  },
  {
    id: "19",
    name: "Vite Nation",
    image: forum5,
    members: 72,
    createdBy: "anotherUser",
    joined: false,
  },
  {
    id: "20",
    name: "DevOps Corner",
    image: forum6,
    members: 68,
    createdBy: "anotherUser",
    joined: false,
  },
];
