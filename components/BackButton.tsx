import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { icons } from "@/constants";
import { router } from "expo-router";

export default function BackButton({ title }: { title: string }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex flex-row items-center"
      >
        <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </View>
        <Text className="text-xl font-JakartaSemiBold ml-4">{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
