import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router } from "expo-router";

const Help = () => {
  return (
    <ScrollView className="p-6 bg-white">
      <View className="flex flex-row items-center w-full justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
        >
          <Image source={icons.backArrow} className="size-5" />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Help & Support
      </Text>

      <Text className="text-lg font-semibold text-gray-700 mb-2">
        1. Booking & Cancellation
      </Text>
      <Text className="text-gray-600 mb-4">
        - Book in advance through our app or customer service.{"\n"}-
        Cancellations made more than 2 days before pickup are free.{"\n"}- 1-day
        prior cancellations incur a 20% fee.{"\n"}- Same-day cancellations &
        no-shows are non-refundable.
      </Text>

      <Text className="text-lg font-semibold text-gray-700 mb-2">
        2. Payment & Pricing
      </Text>
      <Text className="text-gray-600 mb-4">
        - We accept cash, credit cards, mobile payments, and in-app payments.
        {"\n"}- Additional charges may apply for tolls, waiting time, or peak
        hours.{"\n"}- Flat rates apply for long trips; city rides use metered
        pricing.
      </Text>

      <Text className="text-lg font-semibold text-gray-700 mb-2">
        3. Waiting Time Charges
      </Text>
      <Text className="text-gray-600 mb-4">
        - A 15-minute grace period is included.{"\n"}- After 15 minutes, $1 is
        charged for every additional 3 minutes.
      </Text>

      <Text className="text-lg font-semibold text-gray-700 mb-2">
        4. Passenger & Baggage Policy
      </Text>
      <Text className="text-gray-600 mb-4">
        - Each vehicle has a specific passenger & luggage limit.{"\n"}- Large
        groups or heavy luggage should confirm limits during booking.
      </Text>

      <Text className="text-lg font-semibold text-gray-700 mb-2">
        5. Safety & Insurance
      </Text>
      <Text className="text-gray-600 mb-4">
        - All rides are insured for passenger safety.{"\n"}- Seatbelts must be
        worn at all times.{"\n"}- Report safety concerns to our support team.
      </Text>

      <Text className="text-lg font-semibold text-gray-700 mb-2">
        6. Accessibility & Add-ons
      </Text>
      <Text className="text-gray-600 mb-4">
        - Wheelchair-accessible vehicles & child seats available upon request.
        {"\n"}- Additional charges may apply for paging services at pickup
        points.
      </Text>

      <Text className="text-lg font-semibold text-gray-700 mb-2">
        7. Contact Support
      </Text>
      <Text className="text-gray-600 mb-4">
        - For assistance, contact our support line via the app or call our
        helpline.{"\n"}- You can also reach out for feedback, complaints, or
        lost items.
      </Text>
    </ScrollView>
  );
};

export default Help;
