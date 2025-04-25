import React from "react";
import { View, Text } from "react-native";
import { Car } from "@/lib/definitions";

interface OverviewProps {
  car: Car;
}
export const CarDetailsOverview: React.FC<OverviewProps> = ({ car }) => (
  <View className="mt-7">
    <View className="bg-white rounded-2xl shadow-md p-4">
      <Text className="text-lg font-semibold text-gray-800 mb-2">Overview</Text>
      <Text className="text-gray-600 text-base leading-relaxed">
        {car.description}
      </Text>
    </View>
  </View>
);
