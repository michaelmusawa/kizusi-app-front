import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

type Props = {
  isVisible: boolean;
  daysDiff: number;
  fee: number;
  refund: number;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
  isVisible,
  daysDiff,
  fee,
  refund,
  onConfirm,
  onCancel,
}) => (
  <Modal visible={isVisible} transparent animationType="fade">
    <View className="flex-1 bg-gray-800/70 justify-center items-center">
      <View className="bg-white w-80 p-6 rounded-lg">
        <Text className="text-xl text-center mb-4">
          Are you sure you want to cancel?
        </Text>
        <Text className="text-sm mb-4 text-center">
          View{" "}
          <Text
            className="text-primary-100"
            onPress={() => router.push("/(root)/help")}
          >
            Cancellation Policy
          </Text>{" "}
          for details.
        </Text>
        <Text>Booking Date: {new Date().toLocaleDateString()}</Text>
        <Text>
          Days Until Pickup: {daysDiff > 0 ? daysDiff : "Pickup day is today"}
        </Text>
        <Text>Cancellation Fee: ${Number(fee ?? 0).toFixed(2)}</Text>
        <Text className="mb-4">
          Refund Amount: ${Number(refund ?? 0).toFixed(2)}
        </Text>
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={onCancel}
            className="bg-red-500 w-24 p-3 rounded-lg items-center"
          >
            <Text className="text-white font-bold">No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            className="bg-green-500 w-24 p-3 rounded-lg items-center"
          >
            <Text className="text-white font-bold">Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default ConfirmationModal;
