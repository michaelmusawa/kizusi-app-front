import React from "react";
import { View, Text } from "react-native";
import { Car } from "@/lib/definitions";

interface OverviewProps {
  car: Car;
}
export const CarDetailsOverview: React.FC<OverviewProps> = ({ car }) => (
  <View className="mt-7">
    <Text className="text-black-300 text-xl font-rubik-bold">Overview</Text>
    <Text className="text-secondary-600 text-base font-rubik mt-2">
      {car.description}
    </Text>
  </View>
);
