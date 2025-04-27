// File: components/AskAIModal.tsx
import React from "react";
import { Modal, View, TouchableOpacity, Image } from "react-native";
import AI from "./AI";
import { icons } from "@/constants";

interface AskAIModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({ visible, onClose }) => (
  <Modal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={onClose}
  >
    <View className="bg-black/50 justify-start items-center p-5 h-full">
      <View className="mt-10 w-full max-w-md bg-gray-50 rounded-lg p-6 shadow-lg relative">
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200"
        >
          <Image source={icons.close} className="size-5" />
        </TouchableOpacity>
        <AI />
      </View>
    </View>
  </Modal>
);

export default AskAIModal;
