import HistoryDisplay from "@/components/HistoryDisplay";
import Search from "@/components/HistorySearch";
import NoUserPage from "@/components/NoUserPage";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

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
