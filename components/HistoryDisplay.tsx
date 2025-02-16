import { Booking } from "@/lib/definitions";
import { useFetch } from "@/lib/fetch";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import BookingCard from "./BookingCard";
import NoResults from "./NoResults";

const HistoryDisplay = ({ query, id }: { query: string; id: string }) => {
  // Build query parameters string

  const queryParams = new URLSearchParams({
    filter: id || "",
    query: query || "",
  }).toString();

  // Fetch history data with query parameters
  const {
    data: response,
    loading: loading,
    error: error,
    refetch,
    setUrl,
  } = useFetch<{ data: Booking[] }>(`/(api)/booking?${queryParams}`, {
    method: "GET",
  });

  const bookings = response?.data || [];

  console.log("bookings:", bookings);

  // Refetch data with updated parameters when filter or query changes
  useEffect(() => {
    const fetchUrl = `/(api)/booking?${new URLSearchParams({
      filter: id || "",
      query: query || "",
    }).toString()}`;

    setUrl(fetchUrl); // Update the URL state
    refetch(); // Refetch with the updated URL
  }, [id, query]);

  if (loading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (error) {
    return <Text className="text-center mt-4">Error loading history.</Text>;
  }

  return (
    <View>
      {bookings?.length > 0 ? (
        bookings.map((b, index) => (
          <View key={index}>
            <BookingCard booking={b} />
          </View>
        ))
      ) : (
        <NoResults />
      )}
    </View>
  );
};

export default HistoryDisplay;
