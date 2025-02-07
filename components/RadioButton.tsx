import { View, Text, TouchableOpacity } from "react-native";

export const RadioButton = ({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}) => (
  <TouchableOpacity
    onPress={() => onSelect(value)}
    className="flex-row items-center my-2"
  >
    <View
      className={`h-5 w-5 rounded-full border-2 ${
        selected ? "border-purple-600" : "border-gray-400"
      } flex items-center justify-center mr-3`}
    >
      {selected && <View className="h-2.5 w-2.5 rounded-full bg-purple-600" />}
    </View>
    <Text className="text-black-300 text-sm text-center font-rubik mt-1.5">
      {label}
    </Text>
  </TouchableOpacity>
);
