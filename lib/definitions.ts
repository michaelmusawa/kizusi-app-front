export type Car = {
  id: string;
  name: string;
  brand: Brand;
  category: { categoryId: string; name: string; categoryPrice: number };
  price: number;
  image: string;
  description: string;
  addons: { addonId: string; addonName: string; addonValue: string }[];
  features: { featureName: string; featureValue: string }[];
};

export type Brand = {
  brandId: string;
  brandName: string;
};

export type Category = {
  id: string;
  name: string;
  brands: Brand[];
  price: number;
  image: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
};

export type Booking = {
  id: string;
  userId: string;
  carId: string;
  bookingDate: Date;
  departure: string;
  destination: string;
  status: string;
  amount: number;
  bookType: string;
  bookingStatus: string;
  paymentStatus: string;
  paymentType: string;
  carName: string;
};
