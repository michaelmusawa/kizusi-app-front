import { icons } from "@/constants";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import AskAIModal from "./ai/AskAIModal";

export const LiveChatSupport: React.FC = () => {
  const [askAIModalOpen, setAskAIModalOpen] = useState(false);

  return (
    <>
      <View className="absolute bottom-24 right-5 z-50">
        <TouchableOpacity
          onPress={() => setAskAIModalOpen(true)}
          className="bg-blue-600/10 p-4 rounded-full shadow-lg"
          activeOpacity={0.8}
        >
          <View className="flex gap-1 flex-row">
            <Image source={icons.ai} className="size-5" />
            <Text className="text-white font-bold">AI</Text>
          </View>
        </TouchableOpacity>
      </View>

      <AskAIModal
        visible={askAIModalOpen}
        onClose={() => setAskAIModalOpen(false)}
      />
    </>
  );
};
