import { WebView } from "react-native-webview";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function App() {
  const { callbackUrl } = useLocalSearchParams<{ callbackUrl?: string }>();

  const onNavigationStateChange = (navState: any) => {
    console.log("the navigation change", navState.url);
  };

  return callbackUrl ? (
    <WebView
      className="h-64 w-48"
      source={{ uri: callbackUrl }}
      javaScriptEnabled={true}
      sharedCookiesEnabled={true}
      onNavigationStateChange={onNavigationStateChange}
    />
  ) : (
    <View>
      <Text>No url found</Text>
    </View>
  );
}
