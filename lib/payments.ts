import React, { useEffect } from "react";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

const PaymentCallbackHandler = () => {
  useEffect(() => {
    // Function to handle the deep link URL when the app is opened from a callback URL
    const handleDeepLink = (event) => {
      const { url } = event;

      // Parse the URL to get the status and transactionId parameters
      const { path, queryParams } = Linking.parse(url);

      // Assuming the callback URL looks like "yourapp://payment/callback?status=success&transactionId=12345"
      const { status, transactionId } = queryParams;

      if (status === "success") {
        // Payment successful, handle success logic
        Alert.alert("Payment Success", `Transaction ID: ${transactionId}`);
      } else {
        // Handle failed payment
        Alert.alert("Payment Failed", "Please try again.");
      }
    };

    // Add an event listener to listen for deep links
    Linking.addEventListener("url", handleDeepLink);

    // Cleanup the event listener when the component is unmounted
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  return null; // This is a handler component, no UI needed here
};

export default PaymentCallbackHandler;
