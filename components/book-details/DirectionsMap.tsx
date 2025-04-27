import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { MapWithMarkers } from "@/components/Geoapify";
import { icons } from "@/constants";
import { calculateDaysBetween } from "@/lib/utils";

export interface DirectionsData {
  departureLatitude: number | null;
  departureLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  departureAddress: string | null;
  destinationAddress?: string | null;
  date?: string | null | Date;
  endDate?: string | null | Date;
  bookType: "full_day" | string | null;
  rideDetails?: { time: number | null };
}

type Props = {
  data: DirectionsData;
};

const DirectionsMap: React.FC<Props> = ({ data }) => {
  const {
    departureLatitude,
    departureLongitude,
    destinationLatitude,
    destinationLongitude,
    departureAddress,
    destinationAddress,
    date,
    endDate,
    bookType,
  } = data;

  let numberOfDays = 1;
  if (date && endDate) {
    numberOfDays = calculateDaysBetween(date, endDate);
  }

  const { width } = Dimensions.get("window");
  const itemWidth = width - 40; // account for horizontal padding
  const aspectRatio = 16 / 9;

  return (
    <View>
      <View className="bg-gray-50 rounded-2xl shadow-md p-1 mt-5">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Directions
        </Text>

        <View
          className="rounded-2xl overflow-hidden bg-white shadow-lg"
          style={{ width: itemWidth, aspectRatio }}
        >
          {/* Full-size map as background */}
          <View>
            <MapWithMarkers
              departureLatitude={Number(departureLatitude)}
              departureLongitude={Number(departureLongitude)}
              destinationLatitude={Number(destinationLatitude)}
              destinationLongitude={Number(destinationLongitude)}
            />
          </View>

          {/* Text overlay at bottom */}
          <View className="absolute bottom-0 left-0 right-0 bg-black/40 px-4 py-3 rounded-2xl">
            <Text
              className="text-white text-base font-semibold"
              numberOfLines={1}
            >
              Departure: {departureAddress}
            </Text>
            {destinationAddress && (
              <Text
                className="text-white text-base font-semibold mt-1"
                numberOfLines={1}
              >
                Destination: {destinationAddress}
              </Text>
            )}

            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-white text-sm font-rubik-bold">
                {bookType === "full_day"
                  ? `Full day: ${numberOfDays} ${numberOfDays === 1 ? "day" : "days"}`
                  : "Transfer"}
              </Text>

              <View className="items-end">
                <Text className="text-white text-sm font-rubik-bold">
                  {date ? new Date(date).toLocaleDateString() : "N/A"}{" "}
                  {date ? new Date(date).toLocaleTimeString() : "N/A"}
                </Text>
                {endDate && (
                  <Text className="text-white text-sm font-rubik-bold mt-1">
                    {new Date(endDate).toLocaleDateString()}{" "}
                    {new Date(endDate).toLocaleTimeString()}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DirectionsMap;
