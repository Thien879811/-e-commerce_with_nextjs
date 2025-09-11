// Định nghĩa các interface chung cho toàn bộ ứng dụng

// User interface
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string; // Thêm thuộc tính phone
  role: string;
  createdAt: string;
}

// Product interface
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  ratings: number;
  numOfReviews: number;
  images: string[];
  category: Category;
  stock: number;
  createdAt: string;
}

// Category interface
export interface Category {
  _id: string;
  name: string;
  description?: string | undefined;
  image?: {
    url: string;
  };
}

// Cart item interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart interface
export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
}

// Order interface
export interface Order {
  _id: string;
  user: string | User;
  items: CartItem[];
  shippingAddress: {
    address: string;
    city: string;
    phoneNumber: string;
    postalCode: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
  };
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}