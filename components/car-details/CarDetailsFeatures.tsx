import React from "react";
import { View, Image, Text } from "react-native";
import { featureIcons } from "@/constants/data";
import { icons } from "@/constants";
import { Car } from "@/lib/definitions";

interface FeaturesProps {
  car: Car;
}
export const CarDetailsFeatures: React.FC<FeaturesProps> = ({ car }) => (
  <View className="bg-gray-50 rounded-2xl shadow-md p-4">
    <Text className="text-lg font-semibold text-gray-800 mb-4">Features</Text>
    <View className="flex-row flex-wrap justify-between">
      {car.features.map((feat, i) => {
        const Icon =
          (featureIcons as any)[feat.featureName.toLowerCase()] || icons.star;
        return (
          <View key={i} className="w-1/3 items-center mb-6">
            <View className="p-2 rounded-full border border-primary-100 shadow-lg">
              <Image source={Icon} className="size-6" />
            </View>
            <Text className="mt-2 text-sm text-gray-700 font-medium text-center">
              {feat.featureValue} {feat.featureName}
            </Text>
          </View>
        );
      })}
    </View>
  </View>
);

{
  /* <View className="flex flex-row flex-wrap items-center mt-2 border-y border-gray-300 py-4">
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
    </View> */
}
