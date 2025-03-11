import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={styles.container}>
        <Image
          source={require("../assets/images/notfound.png")}
          style={styles.image}
        />
        <Text style={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to Home Screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
