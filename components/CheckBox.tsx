import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
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
      I consent to the
      <Text
        className="text-primary-100"
        onPress={() => router.push("/(root)/help")}
      >
        {" "}
        terms and conditions{" "}
      </Text>
      associated with use of this application and payment procedures
    </Text>
  </TouchableOpacity>
);
