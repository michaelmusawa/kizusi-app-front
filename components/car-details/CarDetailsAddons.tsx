import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { addonIcons } from "@/constants/data";
import { Car } from "@/lib/definitions";
import { icons } from "@/constants";

interface AddonsProps {
  car: Car;
}
export const CarDetailsAddons: React.FC<AddonsProps> = ({ car }) => (
  <View className="mt-7">
    {/* <Text className="text-black-300 text-xl font-rubik-bold">
      Available addons
    </Text>
    <View className="flex-row mt-4 gap-1">
      {car.addons.map((addon, i) => {
        const icon = addonIcons[addon.addonName] || "❓";
        return (
          <View key={i} className="flex-1 items-center min-w-16 max-w-20">
            <Text className="text-xs text-secondary-600 font-rubik-medium">
              +{addon.addonValue}
            </Text>
            <View className="size-14 rounded-full bg-primary-100 items-center justify-center">
              <Text className="text-lg">{icon}</Text>
            </View>
            <Text
              className="text-black-300 text-sm text-center font-rubik mt-1.5"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {addon.addonName}
            </Text>
          </View>
        );
      })}
    </View> */}
    <View className="bg-white rounded-2xl shadow-md p-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        Available Add‑Ons
      </Text>
      <View className="flex-row gap-2">
        {car.addons.map((addon, i) => {
          const Icon = addonIcons[addon.addonName] || icons.point;
          return (
            <TouchableOpacity
              key={i}
              className="flex-1 bg-gray-50 rounded-2xl p-3 items-center shadow-sm"
              activeOpacity={0.7}
            >
              <View className="bg-gradient-to-br from-green-300 to-green-500 p-3 rounded-full mb-2 shadow-md">
                <Text className="text-xl text-white">+{addon.addonValue}</Text>
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
