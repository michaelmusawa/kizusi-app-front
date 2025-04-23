import React from "react";
import { View, Text, Image } from "react-native";
import { MapWithMarkers } from "@/components/Geoapify";
import { icons } from "@/constants";
import { calculateDaysBetween } from "@/lib/utils";

export interface DirectionsData {
  departureLatitude: string;
  departureLongitude: string;
  destinationLatitude: string;
  destinationLongitude: string;
  departureAddress: string;
  destinationAddress?: string;
  date?: string;
  endDate?: string;
  bookType: "full_day" | string;
  rideDetails?: { time: number };
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

  return (
    <View className="mt-7 px-5">
      <Text className="text-black-300 text-xl font-rubik-bold">Directions</Text>
      <View className="flex w-full mt-4 py-4 rounded-lg bg-gray-50">
        <View className="flex flex-row gap-2 items-center">
          <MapWithMarkers
            departureLatitude={Number(departureLatitude)}
            departureLongitude={Number(departureLongitude)}
            destinationLatitude={Number(destinationLatitude)}
            destinationLongitude={Number(destinationLongitude)}
          />
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Image source={icons.point} className="h-5 w-5" />
              <Text className="ml-2 font-semibold">{departureAddress}</Text>
            </View>
            {destinationAddress && (
              <View className="flex-row items-center mb-2">
                <Image source={icons.to} className="h-5 w-5" />
                <Text className="ml-2 font-semibold">{destinationAddress}</Text>
              </View>
            )}
            <View className="mt-3">
              <Text className="text-base font-rubik-bold text-secondary-100">
                {bookType === "full_day"
                  ? `Full day: ${numberOfDays} ${numberOfDays === 1 ? "day" : "days"}`
                  : "Transfer"}
              </Text>
              <Text className="text-base font-rubik-bold text-secondary-100 mt-1">
                {new Date(date ?? "").toLocaleDateString()}{" "}
                {new Date(date ?? "").toLocaleTimeString()}
              </Text>
              {endDate && (
                <Text className="text-base font-rubik-bold text-secondary-100 mt-1">
                  {new Date(endDate).toLocaleDateString()}{" "}
                  {new Date(endDate).toLocaleTimeString()}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DirectionsMap;
