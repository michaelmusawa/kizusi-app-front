import { View, Image, Text } from "react-native";

export const FeatureItem = ({ icon, label }: { icon: any; label: string }) => (
  <View className="flex flex-col justify-center items-center mx-2">
    <Image source={icon} className="w-5 h-5" resizeMode="contain" />
    <Text className="text-sm">{label}</Text>
  </View>
);
