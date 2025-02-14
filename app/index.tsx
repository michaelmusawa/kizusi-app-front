import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import * as Linking from "expo-linking";

export default function Home() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // Listen for incoming deep links
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Check if the app was launched from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      // Clean up the event listener
      subscription.remove();
    };
  }, []);

  const handleDeepLink = (event) => {
    const { url } = event;
    console.log("Deep link URL:", url);

    // Parse the URL and navigate to the appropriate screen
    // Example: Handle a callback URL from a payment gateway
    if (url.includes("payment-success")) {
      // Navigate to a success screen
      console.log("Payment successful!");
    } else if (url.includes("payment-failure")) {
      // Navigate to a failure screen
      console.log("Payment failed!");
    }
  };

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
