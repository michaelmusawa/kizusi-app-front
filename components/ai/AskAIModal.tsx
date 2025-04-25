// File: components/AskAIModal.tsx
import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import AI from "./AI";

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
    className="flex"
  >
    <View className="flex-1 bg-black/50 justify-start items-center p-5">
      <View className="mt-10 w-full max-w-md bg-white rounded-lg p-6 shadow-lg relative">
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200"
        >
          {/* <CancelIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" /> */}
        </TouchableOpacity>
        <AI />
      </View>
    </View>
  </Modal>
);

export default AskAIModal;
