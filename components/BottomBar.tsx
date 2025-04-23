import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

type Props = {
  paymentAmount: number;
  userExists: boolean;
  onCheckout: () => void;
  signInPath: string;
};

const BottomBar: React.FC<Props> = ({
  paymentAmount,
  userExists,
  onCheckout,
  signInPath,
}) => (
  <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
    <View className="flex flex-row items-center justify-between gap-10">
      <View className="flex flex-col items-start">
        <Text className="text-black-200 text-xs font-rubik-medium">
          Total price
        </Text>
        <Text
          numberOfLines={1}
          className="text-secondary-100 text-start text-2xl font-rubik-bold"
        >
          Ksh.{paymentAmount}
        </Text>
      </View>

      <TouchableOpacity
        onPress={userExists ? onCheckout : () => router.push(signInPath)}
        className="flex-1 flex flex-row items-center justify-center bg-secondary-100 py-2 rounded-full shadow-md shadow-zinc-400"
      >
        <Text className="text-white text-lg text-center font-rubik-bold">
          {userExists ? "Check out" : "Login to check out"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default BottomBar;
