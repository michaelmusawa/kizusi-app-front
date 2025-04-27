import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { addonIcons } from "@/constants/data";
import { Car } from "@/lib/definitions";

type Props = {
  car?: Car | null;
  addons?: string[];
  addonsAmount?: number;
  setAddons?: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddonsSection: React.FC<Props> = ({
  car,
  addons,
  addonsAmount,
  setAddons,
}) => {
  const handlePress = (addonName: string) => {
    setAddons?.((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : // eslint-disable-next-line prettier/prettier
          [...prev, addonName]
    );
  };

  // Sum display must come from parent via utils
  return (
    <View className="bg-gray-50 rounded-2xl shadow-md p-4 mt-5">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="flex flex-row justify-between text-lg font-semibold text-gray-800">
          Select addons
        </Text>
        {addonsAmount && addonsAmount > 0 ? (
          <Text className="flex flex-row justify-between text-sm font-semibold text-gray-800">
            Total: {addonsAmount}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>

      <View className="flex-row gap-2">
        {car?.addons?.map((addon, idx) => {
          const icon = addonIcons[addon.addonName] || "❓";
          const selected = addons?.includes(addon.addonName);

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handlePress(addon.addonName)}
              className="flex-1 bg-gray-100 rounded-2xl p-3 items-center shadow-sm"
            >
              <Text className="text-xs text-gray-700">+{addon.addonValue}</Text>
              <View
                className={`p-3 rounded-full mb-2 shadow-md ${
                  selected ? "bg-primary-100/50" : ""
                }`}
              >
                <Text className="text-lg">{icon}</Text>
              </View>
              <Text className="text-sm text-gray-700 font-medium text-center">
                {addon.addonName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AddonsSection;
