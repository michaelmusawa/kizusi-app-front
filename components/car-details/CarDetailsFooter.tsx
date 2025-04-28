import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface FooterProps {
  id: string;
}
export const CarDetailsFooter: React.FC<FooterProps> = ({ id }) => (
  <View className="absolute bottom-0 w-full bg-white rounded-t-2xl border-t border-primary-200 p-7">
    <LinearGradient
      // your two color stops
      colors={["#FED309", "#58B8C9"]}
      start={[0, 0]}
      end={[1, 0]}
      // tailwind classNames applied via style prop, or convert to style object
      className="flex-1 rounded-full shadow-md shadow-zinc-400 overflow-hidden"
    >
      <TouchableOpacity
        onPress={() => router.replace(`/${id}/add-directions`)}
        className="flex-1 py-3 rounded-full items-center"
      >
        <Text className="text-white text-lg font-rubik-bold">
          Proceed to book
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);
