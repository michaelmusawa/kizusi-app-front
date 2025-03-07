import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function App() {
  const { callbackUrl } = useLocalSearchParams<{ callbackUrl?: string }>();
  return callbackUrl ? (
    <WebView className="h-64 w-48" source={{ uri: callbackUrl }} />
  ) : (
    <View>
      <Text>No url found</Text>
    </View>
  );
}
