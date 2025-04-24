import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

interface FooterProps {
  id: string;
}
export const CarDetailsFooter: React.FC<FooterProps> = ({ id }) => (
  <View className="absolute bottom-0 w-full bg-white rounded-t-2xl border-t border-primary-200 p-7">
    <TouchableOpacity
      onPress={() => router.replace(`/${id}/add-directions`)}
      className="flex-1 bg-secondary-100 py-3 rounded-full items-center shadow-md shadow-zinc-400"
    >
      <Text className="text-white text-lg font-rubik-bold">
        Proceed to book
      </Text>
    </TouchableOpacity>
  </View>
);
