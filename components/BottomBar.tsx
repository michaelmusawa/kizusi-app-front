import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

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

      <LinearGradient
        // your two color stops
        colors={["#FED309", "#58B8C9"]}
        start={[0, 0]}
        end={[1, 0]}
        // tailwind classNames applied via style prop, or convert to style object
        className="flex-1 rounded-full shadow-md shadow-zinc-400 overflow-hidden"
      >
        <TouchableOpacity
          // remove the background color here, since the gradient sits behind
          onPress={
            userExists ? onCheckout : () => router.push(signInPath as any)
          }
          className="flex-1 flex-row items-center justify-center py-2 rounded-full"
        >
          <Text className="text-white text-lg text-center font-rubik-bold">
            {userExists ? "Check out" : "Login to check out"}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </View>
);

export default BottomBar;
