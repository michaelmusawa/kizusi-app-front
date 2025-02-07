import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profileForm" options={{ headerShown: false }} />
      <Stack.Screen name="help" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/book-details" options={{ headerShown: false }} />
      <Stack.Screen name="cancel-order" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/car-details" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/history-details"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[id]/add-directions"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="payments/[id]/payment"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
