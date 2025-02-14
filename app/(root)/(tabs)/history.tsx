import NoResults from "@/components/NoResults";
import { Booking } from "@/lib/definitions";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          `/(root)/${booking.id}/history-details?query=${booking.carId}`
        )
      }
      className="bg-white rounded-lg shadow-md p-4 mb-4"
    >
      <Text className="text-orange-500 font-bold">
        Book type: {booking.bookType}
      </Text>
      <View className="flex-row mt-4">
        <View className="flex-1">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:,&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg border border-red-500"
          />
          <View className="mt-4 flex flex-col gap-2">
            <Text className="text-gray-700">
              <Text className="font-bold">Car: </Text>
              {booking.carName}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Book Type: </Text>
              <Text className="text-green-500">{booking.bookType}</Text>
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Payment status: </Text>
              <Text className="text-green-500">{booking.paymentStatus}</Text>
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Amount: </Text>
              <Text className="text-green-500">{booking.amount}</Text>
            </Text>
          </View>
        </View>
        <View className="flex-1 ml-4">
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-700">Departure:</Text>
            <Text className="ml-2 font-semibold">{booking.departure}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-700">Destination:</Text>
            <Text className="ml-2 font-semibold">{booking.destination}</Text>
          </View>

          <Text className="text-gray-500">
            {booking.bookingDate.toLocaleString()}
          </Text>

          <View className="flex flex-row mt-6 mb-8 gap-2 justify-center items-center">
            <Text className="text-gray-700">
              <Text className="text-green-500">{booking.bookingStatus}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BookingHistory = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <View>
        <Text>Please login to see your booking history</Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
          login
        </TouchableOpacity>
      </View>
    );
  }

  // Build query parameters string
  const queryParams = new URLSearchParams({
    filter: user?.id,
  }).toString();

  // Fetch history data with query parameters
  const {
    data: response,
    loading: loading,
    error: error,
  } = useFetch<{ data: Booking[] }>(`/(api)/booking?${queryParams}`, {
    method: "GET",
  });

  const bookings = response?.data || [];

  if (loading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (error) {
    return <Text className="text-center mt-4">Error loading history.</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mb-24">
      {bookings?.length > 0 ? (
        bookings.map((b, index) => (
          <View key={index}>
            <BookingCard booking={b} />
          </View>
        ))
      ) : (
        <NoResults />
      )}
    </ScrollView>
  );
};

export default BookingHistory;
