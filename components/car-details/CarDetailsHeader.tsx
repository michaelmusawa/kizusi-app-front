// File: components/CarDetailsHeader.tsx
import React from "react";
import { View, Pressable, Image, Text, Platform } from "react-native";
import { icons } from "@/constants";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Car } from "@/lib/definitions";

interface HeaderProps {
  car?: Car | null;
  uri?: string;
}

export const CarDetailsHeader: React.FC<HeaderProps> = ({ car, uri }) => (
  <View className="w-full flex justify-center items-center rounded-b-[40px] overflow-hidden relative">
    <Image
      source={{ uri: car?.image }}
      className="size-full rounded"
      resizeMode="cover"
    />
    {/* <BlurView intensity={60} tint="light" className="absolute inset-0" /> */}
    <LinearGradient
      colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80 }}
      className="rounded-b-3xl"
    />
    <View
      className="absolute inset-x-7 z-50"
      style={{ top: Platform.OS === "ios" ? 70 : 20 }}
    >
      <View className="flex-row justify-between items-center w-full">
        <Pressable
          onPress={() => {
            if (uri) {
              router.push(uri as any);
            } else {
              router.back();
            }
          }}
          className="p-3 bg-white/80 rounded-full shadow"
        >
          <Image source={icons.backArrow} className="w-5 h-5" />
        </Pressable>
        <Text className="text-sm font-rubik-bold text-secondary-100 px-4 py-2 bg-gray-100 rounded-full">
          {car?.brand?.brandName}
        </Text>
      </View>
    </View>
  </View>
);
