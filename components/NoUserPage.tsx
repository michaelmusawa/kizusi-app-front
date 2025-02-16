import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router"; // Use useRouter for navigation

const NoUserPage = ({ text }: { text: string }) => {
  const router = useRouter(); // Initialize the router

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-lg mb-4">{text}</Text>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-in")}
        className="bg-secondary-100 py-2 px-6 rounded-lg"
      >
        <Text className="text-white text-base">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoUserPage; // Corrected export statement
