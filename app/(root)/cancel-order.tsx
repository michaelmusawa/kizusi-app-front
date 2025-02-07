import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { carImages } from "@/constants";
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

const CancelOrder = () => {
  const title = "History";
  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Back Button */}
      <BackButton title={title} />

      {/* Order Details */}
      <Text className="text-xl font-bold mt-4">Order details</Text>

      {/* Car Details */}
      <View className="flex-row mt-4 items-center">
        <Image
          source={carImages.fordCar}
          className="w-40 h-24 rounded-lg mb-4"
        />
        <Text className="ml-4 font-bold text-lg">Subaru SUV E045</Text>
      </View>

      {/* Car Features */}
      <View className="flex-row flex-wrap mt-4">
        <View className="flex-row items-center mr-4 mb-2">
          <Text>🚘</Text>
          <Text className="ml-1 text-gray-700">Bluetooth</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <Text>💧</Text>
          <Text className="ml-1 text-gray-700">Water</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <Text>⚡</Text>
          <Text className="ml-1 text-gray-700">Charger</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <Text>🧍‍♂️</Text>
          <Text className="ml-1 text-gray-700">5 seats</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <Text>🏎️</Text>
          <Text className="ml-1 text-gray-700">200 km/h</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <Text>⚙️</Text>
          <Text className="ml-1 text-gray-700">3.5L</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <Text>🔥</Text>
          <Text className="ml-1 text-gray-700">2 turbo</Text>
        </View>
      </View>

      {/* Booking Details */}
      <View className="bg-gray-100 p-4 rounded-lg mt-4">
        <Text className="text-orange-500 font-bold">Book type: Full day</Text>
        <View className="flex-row mt-4">
          <View className="flex-1">
            <Image
              source={{
                uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:,&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
              }}
              className="w-[80px] h-[90px] rounded-lg border border-red-500"
            />
          </View>
          <View className="flex-1 ml-4">
            <View className="flex-row items-center mb-2">
              <Text className="text-gray-700">Your location:</Text>
              <Text className="ml-2 font-semibold">Keroka, Kisii</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Text className="text-gray-700">To:</Text>
              <Text className="ml-2 font-semibold">Keroka, Kisii</Text>
            </View>
            <Text className="text-gray-500">12th Nov 2024 At 12:30 PM</Text>
          </View>
        </View>
      </View>

      {/* Payment Summary */}
      <Text className="mt-6 text-gray-700 font-bold">Payment summary</Text>
      <Text className="text-xl font-bold mt-2">Ksh. 10,000</Text>
      <Text className="text-gray-500">Total Amount</Text>
      <View className="mt-4">
        <Text className="text-gray-700">
          <Text className="font-bold">Book type: </Text>Immediate booking
        </Text>
        <Text className="text-gray-700 mt-2">
          <Text className="font-bold">Payment method: </Text>PayPal
        </Text>
      </View>

      {/* Payment Status */}
      <View className="flex-row items-center mt-4">
        <View className="bg-green-500 rounded-full p-2">
          <Text className="text-white">✔️</Text>
        </View>
        <Text className="ml-2 text-green-500 font-bold">Paid</Text>
      </View>

      <View className="mt-6 mb-8">
        <CustomButton
          title="Cancel"
          //onPress={() => router.replace("/(root)/book-car")}
          className="w-full"
        />
      </View>
    </ScrollView>
  );
};

export default CancelOrder;
