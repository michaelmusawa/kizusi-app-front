import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  paymentStatus: string;
  bookingStatus: string;
  amount: number;
  onCancel: () => void;
  buttonText?: string; // ← new
  disabled?: boolean; // ← optional flag
};

const StatusBar: React.FC<Props> = ({
  paymentStatus,
  bookingStatus,
  amount,
  onCancel,
  buttonText,
  disabled,
}) => {
  console.log("paymentStatus", paymentStatus);
  // determine button text & styles
  let bgClass = "bg-secondary-100";
  let textClass = "text-white";
  let btnText = bookingStatus;

  if (bookingStatus === "CANCELLED") {
    bgClass = "bg-gray-200";
    textClass = "text-red-500";
    btnText = "Wait for refund";
  } else if (bookingStatus === "NO SHOW") {
    bgClass = "bg-red-400";
    textClass = "text-gray-100";
    btnText = "You missed your ride";
  } else if (paymentStatus === "PENDING") {
    btnText = "Awaiting payment...";
    bgClass = "bg-primary-100/70";
    textClass = "text-gray-700";
  } else if (bookingStatus === "PROCEEDED") {
    btnText = "Hope you enjoyed your ride";
    bgClass = "bg-secondary-100";
  }

  return (
    <View className="absolute bottom-0 w-full bg-white rounded-t-2xl border border-primary-200 py-4 px-7">
      <View className="flex-row justify-between items-center">
        <View className="items-center">
          <Text className="font-rubik-medium text-xs text-primary-100">
            PAYMENT{" "}
            <Text
              className={
                paymentStatus === "CONFIRMED"
                  ? "text-secondary-100"
                  : paymentStatus === "PENDING"
                    ? "text-primary-100"
                    : "text-red-500"
              }
            >
              {paymentStatus === "CONFIRMED"
                ? "Success"
                : paymentStatus === "PENDING"
                  ? "Processing..."
                  : "Failed"}
            </Text>
          </Text>
          <Text className="font-rubik-bold text-2xl text-secondary-100">
            ${amount}
          </Text>
        </View>
        <TouchableOpacity
          onPress={disabled ? () => {} : onCancel}
          className={`${bgClass} flex-1 ml-4 py-2 rounded-full items-center`}
        >
          <Text className={`font-rubik-bold ${textClass}`}>
            {buttonText ?? btnText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StatusBar;
