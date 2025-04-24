import React from "react";
import { View, Text } from "react-native";
import { addonIcons } from "@/constants/data";
import { Car } from "@/lib/definitions";

interface AddonsProps {
  car: Car;
}
export const CarDetailsAddons: React.FC<AddonsProps> = ({ car }) => (
  <View className="mt-7">
    <Text className="text-black-300 text-xl font-rubik-bold">
      Available addons
    </Text>
    <View className="flex-row mt-4">
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
    </View>
  </View>
);
