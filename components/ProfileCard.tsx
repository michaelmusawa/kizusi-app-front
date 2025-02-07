import { router } from "expo-router";
import { Image, TouchableOpacity, View, Text } from "react-native";

export function ProfileCard() {
  <TouchableOpacity
    onPress={() => {
      router.replace("/(root)/(tabs)/home");
    }}
  >
    <Image source={{ uri: "/images" }} className="w-14 h-14 rounded-full" />
    <View>
      <Text>Hi, Jane</Text>
    </View>
  </TouchableOpacity>;
}
