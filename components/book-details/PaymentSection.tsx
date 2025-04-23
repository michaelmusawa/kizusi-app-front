import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Checkbox } from "@/components/CheckBox";
import { RadioButton } from "@/components/RadioButton";
import { icons } from "@/constants";

type Props = {
  amount: number;
  paymentType: string;
  setPaymentType: (val: string) => void;
  paymentOption: string;
  setPaymentOption: (val: string) => void;
  isAgreed: boolean;
  setIsAgreed: (val: boolean) => void;
  error: string | null;
  handlePayment: () => void;
};

const PaymentSection: React.FC<Props> = ({
  amount,
  paymentType,
  setPaymentType,
  paymentOption,
  setPaymentOption,
  isAgreed,
  setIsAgreed,
  error,
  handlePayment,
}) => {
  return (
    <View className="mt-7 px-5">
      <Text className="text-black-300 text-xl font-rubik-bold">
        Payment method
      </Text>
      <View className="flex-row justify-between mt-4">
        <View className="flex-1">
          <RadioButton
            label="Full amount"
            value="full"
            selected={paymentType === "full"}
            onSelect={setPaymentType}
          />
          <RadioButton
            label="Reserve"
            value="reserve"
            selected={paymentType === "reserve"}
            onSelect={setPaymentType}
          />
        </View>

        <View className="flex-1 flex-row">
          {[
            {
              icon: icons.pesapal,
              label: "Pesapal",
              value: "pesapal",
            },
          ].map((addon, index) => (
            <View
              key={index}
              className="flex flex-1 flex-col items-center min-w-16 max-w-20"
            >
              <TouchableOpacity
                key={index}
                onPress={() => setPaymentOption(addon.value)}
                className={`flex-1 items-center p-2 rounded-full ${
                  paymentOption === addon.value
                    ? "bg-gray-100"
                    : "bg-gray-100/50"
                }`}
              >
                <Image
                  source={addon.icon}
                  alt={addon.label}
                  resizeMode="contain"
                />
                <Text className="text-sm font-rubik mt-1">{addon.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Terms & Conditions */}
      <View className="mt-6">
        <Text className="text-black-300 text-xl font-rubik-bold">
          Terms & conditions
        </Text>
        <Checkbox
          checked={isAgreed}
          onChange={(checked) => setIsAgreed(checked)}
        />
        {error && (
          <Text className="text-red-500 text-base font-rubik-semiBold mt-1">
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PaymentSection;
