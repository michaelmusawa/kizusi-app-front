import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import "react-native-get-random-values";

export default function Home() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
