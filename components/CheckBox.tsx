import { View, Text, TouchableOpacity } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
}) => (
  <TouchableOpacity
    onPress={() => onChange(!checked)}
    className="flex-row items-center my-3"
  >
    <View
      className={`h-5 w-5 rounded-md border-2 ${
        checked ? "border-secondary-100 bg-secondary-100" : "border-gray-400"
      } flex items-center justify-center mr-3`}
    >
      {checked && <View className="h-3 w-3 rounded-md bg-white" />}
    </View>
    <Text className="text-secondary-600 text-base font-rubik mt-2">
      {label}
    </Text>
  </TouchableOpacity>
);
