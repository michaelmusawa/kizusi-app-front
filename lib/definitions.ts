export type Car = {
  id: number;
  name: string;
  brand: Brand;
  category: { categoryId: string; categoryName: string; categoryPrice: number };
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
  password?: string;
};

export type Booking = {
  id: string;
  userId: string;
  carId: string;
  bookingDate: Date;
  departure: string;
  departureLongitude: string;
  departureLatitude: string;
  destinationLatitude: string;
  destinationLongitude: string;
  destination: string;
  status: string;
  amount: number;
  bookType: string;
  bookingStatus: string;
  paymentStatus: string;
  paymentType: string;
  carName: string;
  addons: { addonId: string; addonName: string; addonValue: number }[];
};

export type PaymentData = {
  amount?: number | null;
  first_name: string | undefined | null;
  last_name: string | undefined | null;
  email: string | undefined | null;
  phoneNumber: string | undefined | null | any;
  image?: string | undefined | null;
  carId?: number | undefined;
  reference: string | null;
  userId: string | undefined | null;
  bookingDate?: string | null;
  departureLatitude?: number | undefined | null;
  departureLongitude?: number | undefined | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
  departure?: string | null;
  destination?: string | null;
  bookType?: string | null;
  paymentType?: string | null;
  addons?: string[] | null;
  description: string | null;
  callbackUrl: string | null;
  [key: string]: any; // Allow additional optional fields if needed
};

export type RefundData = {
  amount: number | null;
  first_name: string | undefined | null;
  last_name: string | undefined | null;
  remarks: string;
};
