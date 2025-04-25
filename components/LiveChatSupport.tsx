import { icons } from "@/constants";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import AskAIModal from "./ai/AskAIModal";
// import { Kommunicate } from "@kommunicate/kommunicate-react-native";

export const LiveChatSupport: React.FC = () => {
  const [askAIModalOpen, setAskAIModalOpen] = useState(false);
  //   useEffect(() => {
  //     Kommunicate.init("YOUR_KM_APP_ID"); // initialize Kommunicate SDK
  //   }, []);

  //   const openChat = () => {
  //     Kommunicate.login({ userId: "guest_user" })
  //       .then(() => Kommunicate.openConversation({ withPreChat: true }))
  //       .catch(err => console.error("Chat init error", err));
  //   };

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
