import HistoryDisplay from "@/components/HistoryDisplay";
import Search from "@/components/HistorySearch";
import NoResults from "@/components/NoResults";
import NoUserPage from "@/components/NoUserPage";
import { Booking } from "@/lib/definitions";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const BookingHistory = () => {
  const { user } = useUser();
  const params = useLocalSearchParams<{ query?: string }>();

  if (!user) {
    return <NoUserPage text={"Please login to view your history"} />;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mb-24">
      <Search />
      <HistoryDisplay id={user.id} query={params.query ?? ""} />
    </ScrollView>
  );
};

export default BookingHistory;
