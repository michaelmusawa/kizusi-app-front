import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { RadioButton } from "@/components/RadioButton";
import { icons } from "@/constants";

type Props = {
  paymentType: string;
  onSelectType?: (val: string) => void;
  selectedOption?: string;
  onSelectOption?: (val: string) => void;
};

const PaymentMethodSection: React.FC<Props> = ({
  paymentType,
  onSelectType,
  selectedOption,
  onSelectOption,
}) => (
  <View className="mt-7 px-5">
    <Text className="font-rubik-bold text-xl text-black-300">
      Payment method
    </Text>
    <View className="flex-row justify-between mt-4">
      <View className="flex-1">
        <RadioButton
          label="Full amount"
          value="full"
          selected={paymentType === "full"}
          onSelect={onSelectType || (() => {})}
        />
        <RadioButton
          label="Reserve"
          value="reserve"
          selected={paymentType === "reserve"}
          onSelect={onSelectType || (() => {})}
        />
      </View>
      <View className="flex-1 flex-row mt-4 justify-around">
        {[{ icon: icons.pesapal, label: "Pesapal", value: "pesapal" }].map(
          (opt, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => (onSelectOption ?? (() => {}))(opt.value)}
              className={`p-2 rounded-full ${
                selectedOption === opt.value ? "bg-gray-100" : "bg-gray-100/50"
              }`}
            >
              <Image source={opt.icon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            // eslint-disable-next-line prettier/prettier
          )
        )}
      </View>
    </View>
  </View>
);

export default PaymentMethodSection;
