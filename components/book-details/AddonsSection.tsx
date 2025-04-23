import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { addonIcons } from "@/constants/data";
import { Car } from "@/lib/definitions";

type Props = {
  car?: Car;
  addons: string[];
  setAddons: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddonsSection: React.FC<Props> = ({ car, addons, setAddons }) => {
  const handlePress = (addonName: string) => {
    setAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : // eslint-disable-next-line prettier/prettier
          [...prev, addonName]
    );
  };

  // Sum display must come from parent via utils
  return (
    <View className="mt-7 px-5">
      <Text className="text-black-300 text-xl font-rubik-bold">
        Select addons
      </Text>
      <View className="flex-row mt-4">
        {car?.addons?.map((addon, idx) => {
          const icon = addonIcons[addon.addonName] || "❓";
          const selected = addons.includes(addon.addonName);

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handlePress(addon.addonName)}
              className="flex-1 items-center"
            >
              <Text className="text-xs font-rubik-medium">
                +{addon.addonValue}
              </Text>
              <View
                className={`size-14 rounded-full flex items-center justify-center mt-1.5 ${
                  selected ? "border bg-primary-100" : "bg-primary-100/50"
                }`}
              >
                <Text className="text-lg">{icon}</Text>
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-black-300 text-sm font-rubik mt-1"
              >
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
