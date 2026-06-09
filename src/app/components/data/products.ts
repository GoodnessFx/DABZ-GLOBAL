export type Product = {
  id: string;
  name: string;
  category: "iPhones" | "Samsung" | "Laptops" | "Accessories";
  brand: string;
  condition: "Brand New" | "UK Used";
  price: number;
  originalPrice: number | null;
  storage?: string[];
  colors?: string[];
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  isNew: boolean;
  isHotDeal: boolean;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: "iphone-16-128gb",
    name: "iPhone 16 128GB",
    category: "iPhones",
    brand: "Apple",
    condition: "Brand New",
    price: 950000,
    originalPrice: null,
    storage: ["128GB", "256GB", "512GB"],
    colors: ["Black", "White", "Ultramarine", "Pink", "Teal"],
    inStock: true,
    stockCount: 8,
    featured: true,
    isNew: true,
    isHotDeal: false,
    images: [
      "https://images.unsplash.com/photo-1709178295038-acbeec786fcf?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701680853149-1b5240a95eeb?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1709178295004-893b38ec2a4b?w=800&q=80&auto=format&fit=crop",
    ],
    description: "The iPhone 16 features the A18 chip, Camera Control button, and an improved camera system. Brand new, sealed in box with full Apple warranty.",
    specs: [
      { label: "Display", value: "6.1-inch Super Retina XDR" },
      { label: "Chip", value: "A18" },
      { label: "Camera", value: "48MP Main + 12MP Ultra Wide" },
      { label: "Battery", value: "Up to 22 hours video playback" },
      { label: "OS", value: "iOS 18" },
    ],
  },
  {
    id: "iphone-15-pro-256gb",
    name: "iPhone 15 Pro 256GB",
    category: "iPhones",
    brand: "Apple",
    condition: "UK Used",
    price: 820000,
    originalPrice: 900000,
    storage: ["128GB", "256GB"],
    colors: ["Black Titanium", "White Titanium", "Natural Titanium"],
    inStock: true,
    stockCount: 3,
    featured: true,
    isNew: false,
    isHotDeal: true,
    images: [
      "https://images.unsplash.com/photo-1701680853149-1b5240a95eeb?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1709178295004-893b38ec2a4b?w=800&q=80&auto=format&fit=crop",
    ],
    description: "iPhone 15 Pro with titanium design and Action Button. UK used in excellent condition, tested and verified by our team.",
    specs: [
      { label: "Display", value: "6.1-inch Super Retina XDR ProMotion" },
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto" },
      { label: "Battery", value: "Up to 23 hours video playback" },
      { label: "OS", value: "iOS 18" },
    ],
  },
  {
    id: "iphone-14-plus-128gb",
    name: "iPhone 14 Plus 128GB",
    category: "iPhones",
    brand: "Apple",
    condition: "UK Used",
    price: 620000,
    originalPrice: 700000,
    storage: ["128GB", "256GB"],
    colors: ["Midnight", "Starlight", "Purple", "Blue"],
    inStock: true,
    stockCount: 5,
    featured: false,
    isNew: false,
    isHotDeal: true,
    images: [
      "https://images.unsplash.com/photo-1709178295004-893b38ec2a4b?w=800&q=80&auto=format&fit=crop",
    ],
    description: "iPhone 14 Plus with large 6.7-inch display. UK used in excellent condition.",
    specs: [
      { label: "Display", value: "6.7-inch Super Retina XDR" },
      { label: "Chip", value: "A15 Bionic" },
      { label: "Camera", value: "12MP Main + 12MP Ultra Wide" },
      { label: "Battery", value: "Up to 26 hours video playback" },
      { label: "OS", value: "iOS 18" },
    ],
  },
  {
    id: "samsung-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    category: "Samsung",
    brand: "Samsung",
    condition: "Brand New",
    price: 1450000,
    originalPrice: null,
    storage: ["256GB", "512GB", "1TB"],
    colors: ["Titanium Black", "Titanium Silver", "Titanium Blue"],
    inStock: true,
    stockCount: 4,
    featured: true,
    isNew: true,
    isHotDeal: false,
    images: [
      "https://images.unsplash.com/photo-1707438095940-1eee18e85400?w=800&q=80&auto=format&fit=crop",
    ],
    description: "Samsung Galaxy S25 Ultra with built-in S Pen, 200MP camera, and Snapdragon 8 Elite. The ultimate Android flagship.",
    specs: [
      { label: "Display", value: "6.9-inch Dynamic AMOLED 2X 120Hz" },
      { label: "Chip", value: "Snapdragon 8 Elite" },
      { label: "Camera", value: "200MP Main + 50MP 5x + 10MP 3x + 12MP Ultra Wide" },
      { label: "Battery", value: "5000mAh, 45W wired" },
      { label: "OS", value: "Android 15, One UI 7" },
    ],
  },
  {
    id: "samsung-s24-dual",
    name: "Samsung Galaxy S24 (Dual SIM)",
    category: "Samsung",
    brand: "Samsung",
    condition: "Brand New",
    price: 850000,
    originalPrice: null,
    storage: ["128GB", "256GB"],
    colors: ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"],
    inStock: true,
    stockCount: 6,
    featured: true,
    isNew: false,
    isHotDeal: false,
    images: [
      "https://images.unsplash.com/photo-1662947995689-ec5165848ad0?w=800&q=80&auto=format&fit=crop",
    ],
    description: "Samsung Galaxy S24 with Google AI features, 7 years of OS updates, and Dual SIM support. Perfect for Nigeria.",
    specs: [
      { label: "Display", value: "6.2-inch Dynamic AMOLED 2X 120Hz" },
      { label: "Chip", value: "Snapdragon 8 Gen 3" },
      { label: "Camera", value: "50MP Main + 10MP 3x + 12MP Ultra Wide" },
      { label: "Battery", value: "4000mAh, 25W wired" },
      { label: "OS", value: "Android 14, One UI 6.1" },
    ],
  },
  {
    id: "macbook-air-m2",
    name: "MacBook Air M2 256GB",
    category: "Laptops",
    brand: "Apple",
    condition: "UK Used",
    price: 750000,
    originalPrice: 850000,
    storage: ["256GB", "512GB"],
    colors: ["Midnight", "Starlight", "Silver", "Space Gray"],
    inStock: true,
    stockCount: 3,
    featured: true,
    isNew: false,
    isHotDeal: true,
    images: [
      "https://images.unsplash.com/photo-1615788189819-bee84874da4b?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615788236892-040dcc5c2bd0?w=800&q=80&auto=format&fit=crop",
    ],
    description: "MacBook Air with M2 chip. Fanless design, all-day battery life. UK used in pristine condition.",
    specs: [
      { label: "Chip", value: "Apple M2 (8-core CPU, 8-core GPU)" },
      { label: "RAM", value: "8GB Unified Memory" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: "13.6-inch Liquid Retina" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
  },
  {
    id: "macbook-pro-m3",
    name: "MacBook Pro M3 512GB",
    category: "Laptops",
    brand: "Apple",
    condition: "Brand New",
    price: 1350000,
    originalPrice: null,
    storage: ["512GB", "1TB"],
    colors: ["Space Black", "Silver"],
    inStock: true,
    stockCount: 2,
    featured: false,
    isNew: true,
    isHotDeal: false,
    images: [
      "https://images.unsplash.com/photo-1615788236892-040dcc5c2bd0?w=800&q=80&auto=format&fit=crop",
    ],
    description: "MacBook Pro with M3 chip. ProMotion display, studio-quality microphone, advanced camera. Brand new sealed.",
    specs: [
      { label: "Chip", value: "Apple M3 (8-core CPU, 10-core GPU)" },
      { label: "RAM", value: "8GB Unified Memory" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14.2-inch Liquid Retina XDR ProMotion" },
      { label: "Battery", value: "Up to 22 hours" },
    ],
  },
  {
    id: "hp-elitebook-840",
    name: "HP EliteBook 840 G9",
    category: "Laptops",
    brand: "HP",
    condition: "UK Used",
    price: 420000,
    originalPrice: 480000,
    storage: ["256GB", "512GB"],
    colors: ["Silver"],
    inStock: true,
    stockCount: 7,
    featured: false,
    isNew: false,
    isHotDeal: true,
    images: [
      "https://images.unsplash.com/photo-1615788189819-bee84874da4b?w=800&q=80&auto=format&fit=crop",
    ],
    description: "HP EliteBook 840 G9 business laptop. Intel Core i7 12th Gen, 16GB RAM. UK used, fully tested.",
    specs: [
      { label: "Processor", value: "Intel Core i7-1255U" },
      { label: "RAM", value: "16GB DDR5" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: "14-inch FHD IPS" },
      { label: "OS", value: "Windows 11 Pro" },
    ],
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2nd Gen",
    category: "Accessories",
    brand: "Apple",
    condition: "Brand New",
    price: 165000,
    originalPrice: null,
    storage: [],
    colors: ["White"],
    inStock: true,
    stockCount: 12,
    featured: true,
    isNew: true,
    isHotDeal: false,
    images: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80&auto=format&fit=crop",
    ],
    description: "AirPods Pro 2 with H2 chip, Adaptive Audio, and Personalized Spatial Audio. Brand new, sealed box.",
    specs: [
      { label: "Chip", value: "Apple H2" },
      { label: "ANC", value: "Active Noise Cancellation" },
      { label: "Battery", value: "Up to 6 hours, 30 hours with case" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Features", value: "Adaptive Audio, Transparency Mode" },
    ],
  },
  {
    id: "airpods-4",
    name: "AirPods 4 (ANC)",
    category: "Accessories",
    brand: "Apple",
    condition: "Brand New",
    price: 120000,
    originalPrice: null,
    storage: [],
    colors: ["White"],
    inStock: true,
    stockCount: 8,
    featured: false,
    isNew: true,
    isHotDeal: false,
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80&auto=format&fit=crop",
    ],
    description: "AirPods 4 with Active Noise Cancellation and the new open-ear design. Brand new, sealed.",
    specs: [
      { label: "Chip", value: "Apple H2" },
      { label: "ANC", value: "Active Noise Cancellation" },
      { label: "Battery", value: "Up to 5 hours, 30 hours with case" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Design", value: "Open-ear" },
    ],
  },
];

export type Category = {
  name: string;
  slug: string;
  image: string;
  filter: Product["category"];
};

export const categories: Category[] = [
  {
    name: "iPhones",
    slug: "iphones",
    image: "https://images.unsplash.com/photo-1709178295038-acbeec786fcf?w=400&q=80&auto=format&fit=crop",
    filter: "iPhones",
  },
  {
    name: "Samsung",
    slug: "samsung",
    image: "https://images.unsplash.com/photo-1707438095940-1eee18e85400?w=400&q=80&auto=format&fit=crop",
    filter: "Samsung",
  },
  {
    name: "MacBooks",
    slug: "macbooks",
    image: "https://images.unsplash.com/photo-1615788236892-040dcc5c2bd0?w=400&q=80&auto=format&fit=crop",
    filter: "Laptops",
  },
  {
    name: "Laptops",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1615788189819-bee84874da4b?w=400&q=80&auto=format&fit=crop",
    filter: "Laptops",
  },
  {
    name: "AirPods",
    slug: "airpods",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80&auto=format&fit=crop",
    filter: "Accessories",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&q=80&auto=format&fit=crop",
    filter: "Accessories",
  },
];

export const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;
