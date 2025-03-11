import { icons } from ".";

export const categories = [
  { title: "All", category: "" },
  { title: "Toyota", category: "Toyota" },
  { title: "Benz", category: "Benz" },
  { title: "BMW", category: "BMW" },
  { title: "Audi", category: "Audi" },
  { title: "Lexus", category: "Lexus" },
  { title: "Mazda", category: "Mazda" },
  { title: "Subaru", category: "Subaru" },
  { title: "Others", category: "Others" },
];

export const featureIcons = {
  doors: icons.door,
  seats: icons.seat,
  speed: icons.speed,
  sunRoof: icons.sunroof,
  fuel: icons.fuel,
};

export const addonIcons: { [key: string]: string } = {
  Add: "➕",
  Bluetooth: "📶",
  Water: "💧",
  Charger: "🔋",
};
