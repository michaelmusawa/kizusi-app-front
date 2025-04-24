import React from "react";
import { View, Image, Text } from "react-native";
import { featureIcons } from "@/constants/data";
import { icons } from "@/constants";
import { Car } from "@/lib/definitions";

interface FeaturesProps {
  car: Car;
}
export const CarDetailsFeatures: React.FC<FeaturesProps> = ({ car }) => (
  <View className="flex flex-row flex-wrap items-center mt-2 border-y border-gray-300 py-4">
    {car.features.map((feat, i) => {
      const Icon = featureIcons[feat.featureName.toLowerCase()] || icons.star;
      return (
        <View key={i} className="items-center justify-center mb-2 gap-2 w-20">
          <View className="bg-primary-100 rounded-full size-10 items-center justify-center">
            <Image source={Icon} className="size-4" />
          </View>
          <Text className="text-black-300 text-center text-sm font-rubik-medium">
            {feat.featureValue} {feat.featureName}
          </Text>
        </View>
      );
    })}
  </View>
);
