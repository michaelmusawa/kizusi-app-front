import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import filter from "@/assets/icons/filter.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import speed from "@/assets/icons/speed.png";
import sunroof from "@/assets/icons/sunroof.png";
import fuel from "@/assets/icons/fuel.png";
import seat from "@/assets/icons/seat.png";
import door from "@/assets/icons/door.png";
import rightArrow from "@/assets/icons/rightArrow.png";
import mpesa from "@/assets/icons/mpesa.png";
import pesapal from "@/assets/icons/pesapal.png";
import calender from "@/assets/icons/Calender.png";
import help from "@/assets/icons/Help.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpCar from "@/assets/images/signup-car.png";
import audi from "@/assets/brands/audi.png";
import benz from "@/assets/brands/benz.png";
import lexus from "@/assets/brands/lexus.png";
import mazda from "@/assets/brands/mazda.png";
import subaru from "@/assets/brands/subaru.png";
import toyota from "@/assets/brands/toyota.png";
import bmw from "@/assets/brands/bmw.png";
import audiCar from "@/assets/cars/audi.png";
import benzCar from "@/assets/cars/benz.png";
import fordCar from "@/assets/cars/ford.png";
import volkswagenCar from "@/assets/cars/volkswagen.png";
import suv from "@/assets/cars/suv.png";
import midsuv from "@/assets/cars/midsuv.png";
import bus from "@/assets/cars/bus.png";
import minvan from "@/assets/cars/minivan.png";
import pickup from "@/assets/cars/pickup.png";
import luxuryminvan from "@/assets/cars/luxuryMinivan.png";
import hatchback from "@/assets/cars/hatchback.png";
import sedan from "@/assets/cars/sedan.png";
import favorite from "@/assets/icons/favorite.png";
import cardGradient from "@/assets/images/card-gradient.png";
import whiteGradient from "@/assets/images/white-gradient.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  noResult,
  message,
  cardGradient,
  whiteGradient,
};

export const brands = {
  toyota,
  benz,
  audi,
  subaru,
  lexus,
  mazda,
  bmw,
};

export const carImages = {
  fordCar,
  benzCar,
  audiCar,
  volkswagenCar,
  suv,
  midsuv,
  hatchback,
  minvan,
  luxuryminvan,
  bus,
  sedan,
  pickup,
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
  seat,
  sunroof,
  door,
  fuel,
  speed,
  favorite,
  filter,
  mpesa,
  pesapal,
  calender,
  help,
  rightArrow,
};

export const onboarding = [
  {
    id: 1,
    title: "The perfect car rental in your hands with Kizusi Smartex",
    description:
      "Discover the convenience of finding a perfect chauffer with our Kizusi cab Smartex App.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "We prioritize your safety and enjoyment of your trip",
    description:
      "Each of our car has undergone detailed inspection and maintenance to ensure the enjoyment and safety of your trip",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Your ride, your way. Let's go!",
    description:
      "Enter your date and destination, sit back, and let us take care of the rest.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};

export const carBrands = [
  { id: "1", name: "Toyota", image: brands.toyota },
  { id: "2", name: "Benz", image: brands.benz },
  { id: "3", name: "BMW", image: brands.bmw },
  { id: "4", name: "Audi", image: brands.audi },
  { id: "5", name: "Lexus", image: brands.lexus },
  { id: "6", name: "Mazda", image: brands.mazda },
  { id: "7", name: "Subaru", image: brands.subaru },
];

export const categories = [
  {
    id: "1",
    name: "SUV",
    image: carImages.suv,
    price: "25,000",
    desc: "Spacious and powerful vehicles, ideal for off-road and family trips.",
    seat: "5-7",
    brands: "Toyota, Ford, Honda",
    door: 4,
    sunroof: "yes",
    fuel: "gazler",
  },
  {
    id: "2",
    name: "Mid SUV",
    image: carImages.midsuv,
    price: "25,000",
    desc: "Versatile and comfortable, ideal for small families and city driving.",
    seat: "5",
    brands: "Hyundai, Kia, Nissan",
    door: 4,
    sunroof: "yes",
    fuel: "Moderate",
  },
  {
    id: "3",
    name: "Minivans",
    image: carImages.minvan,
    price: "25,000",
    desc: "Spacious interiors, perfect for group travel and family road trips.",
    seat: "7-8",
    brands: "Honda, Toyota, Chrysler",
    door: 4,
    sunroof: "yes",
    fuel: "Moderate",
  },
  {
    id: "4",
    name: "Luxury Minivans",
    image: carImages.luxuryminvan,
    price: "25,000",
    desc: "Premium interiors with advanced features for maximum comfort.",
    seat: "7-8",
    brands: "Mercedes-Benz, Lexus, BMW",
    door: 4,
    sunroof: "yes",
    fuel: "Moderate",
  },
  {
    id: "5",
    name: "Hatchbacks",
    image: carImages.hatchback,
    price: "25,000",
    desc: "Compact cars, perfect for city commutes and easy parking.",
    seat: "4-5",
    brands: "Volkswagen, Suzuki, Hyundai",
    door: 4,
    sunroof: "yes",
    fuel: "Efficient",
  },
  {
    id: "6",
    name: "Sedans",
    image: carImages.sedan,
    price: "25,000",
    desc: "Comfortable and stylish, great for families or business travel.",
    seat: "4-5",
    brands: "Toyota, Honda, BMW",
    door: 4,
    sunroof: "yes",
    fuel: "Efficient",
  },
  {
    id: "7",
    name: "Pickup Trucks",
    image: carImages.pickup,
    price: "25,000",
    desc: "Tough and durable vehicles for heavy loads and off-road tasks.",
    seat: "2-5",
    brands: "Ford, Chevrolet, Toyota",
    door: 4,
    sunroof: "yes",
    fuel: "Efficient",
  },
  {
    id: "8",
    name: "Bus",
    image: carImages.bus,
    price: "25,000",
    desc: "Designed for large groups, tours, and special events.",
    seat: "23-51",
    brands: "Mercedes-Benz, Volvo, Tata",
    door: 4,
    sunroof: "yes",
    fuel: "Efficient",
  },
];

export const availableCars = [
  {
    id: "1",
    name: "Mercedes Benz",
    image: carImages.benzCar,
    price: "25,000",
    seat: 8,
    door: 4,
    sunroof: "yes",
    fuel: "petrol",
    speed: 180,
    times_booked: 300,
    brand: "Benz",
    category: "Mid SUV",
  },
  {
    id: "2",
    name: "Ford Mustang",
    image: carImages.fordCar,
    price: "30,000",
    seat: 8,
    door: 4,
    sunroof: "yes",
    fuel: "diesel",
    speed: 180,
    times_booked: 300,
    brand: "Toyota",
    category: "Pickup Trucks",
  },
  {
    id: "3",
    name: "Volkswagen Zenger",
    image: carImages.volkswagenCar,
    price: "30,000",
    seat: 8,
    door: 4,
    sunroof: "yes",
    fuel: "diesel",
    speed: 180,
    times_booked: 300,
    brand: "Mazda",
    category: "SUv",
  },
  {
    id: "4",
    name: "Audi A4",
    image: carImages.audiCar,
    price: "40,000",
    seat: 8,
    door: 4,
    sunroof: "yes",
    fuel: "petrol",
    speed: 180,
    times_booked: 300,
    brand: "Audi",
    category: "SUv",
  },
];
