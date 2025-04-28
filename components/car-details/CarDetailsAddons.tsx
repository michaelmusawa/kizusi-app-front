import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { addonIcons } from "@/constants/data";
import { Car } from "@/lib/definitions";
import { icons } from "@/constants";

interface AddonsProps {
  car: Car;
}
export const CarDetailsAddons: React.FC<AddonsProps> = ({ car }) => (
  <View className="mt-5">
    <View className="bg-gray-50 rounded-2xl shadow-md p-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        Available Add‑Ons
      </Text>
      <View className="flex-row gap-2">
        {car.addons.map((addon, i) => {
          const Icon = addonIcons[addon.addonName] || icons.point;
          return (
            <TouchableOpacity
              key={i}
              className="flex-1 bg-gray-100 rounded-2xl p-3 items-center shadow-sm"
              activeOpacity={0.7}
            >
              <Text className="text-xs text-gray-700">+{addon.addonValue}</Text>
              <View className="p-3 rounded-full mb-2 shadow-md">
                <Text className="text-lg">{Icon}</Text>
              </View>
              <Text className="text-sm text-gray-700 font-medium text-center">
                {addon.addonName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  </View>
);
