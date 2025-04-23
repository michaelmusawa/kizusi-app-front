import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  amount: number;
  onPay: () => void;
};

const RefundNotice: React.FC<Props> = ({ amount, onPay }) => (
  <View className="mt-4 px-5">
    <View className="bg-primary-100/50 rounded-lg p-4">
      <Text className="font-rubik-medium text-base text-black-300">
        A full payment is required before the booking date to confirm your
        reservation.
      </Text>
    </View>
    <View className="bg-white rounded-t-2xl border border-primary-200 py-4 px-7 mt-4">
      <View className="flex-row justify-between items-center">
        <View className="items-center">
          <Text className="font-rubik-medium text-xs text-black">
            Payment balance
          </Text>
          <Text className="font-rubik-bold text-2xl text-red-500">
            ${amount}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPay}
          className="flex-1 ml-4 bg-gray-100 py-2 rounded-full items-center"
        >
          <Text className="font-rubik-bold text-gray-600">
            Complete payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default RefundNotice;
