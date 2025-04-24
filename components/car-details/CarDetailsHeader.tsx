// File: components/CarDetailsHeader.tsx
import React from "react";
import { View, TouchableOpacity, Image, Text, Platform } from "react-native";
import { icons } from "@/constants";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Car } from "@/lib/definitions";

interface HeaderProps {
  car: Car;
}

export const CarDetailsHeader: React.FC<HeaderProps> = ({ car }) => (
  <View className="w-full flex justify-center items-center relative">
    <Image
      source={{ uri: car.image }}
      className="size-full"
      resizeMode="cover"
    />
    <LinearGradient
      colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80 }}
    />
    <View
      className="absolute inset-x-7 z-50"
      style={{ top: Platform.OS === "ios" ? 70 : 20 }}
    >
      <View className="flex-row justify-between items-center w-full">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary-200 rounded-full size-11 items-center justify-center"
        >
          <Image source={icons.backArrow} className="size-5" />
        </TouchableOpacity>
        <Text className="text-sm font-rubik-bold text-secondary-100 px-4 py-2 bg-gray-100 rounded-full">
          {car.brand.brandName}
        </Text>
      </View>
    </View>
    <View className="absolute bottom-0 w-full items-center z-50 pb-3">
      <Text className="text-2xl font-rubik-extrabold">{car.name}</Text>
      <Text className="text-black-200 mt-1 font-rubik-medium">
        ({car.category.categoryName})
      </Text>
      <Text className="text-2xl text-secondary-100 font-rubik-extrabold mt-1">
        Ksh. {car.price}/day
      </Text>
    </View>
  </View>
);
