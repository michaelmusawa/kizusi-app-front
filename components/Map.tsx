import React from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { icons } from "@/constants";

import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store";

const directionsAPI = process.env.EXPO_PUBLIC_PLACES_API_KEY;

export default function Map() {
  const {
    userLongitude,
    userLatitude,
    departureLatitude,
    departureLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (!userLatitude && !userLongitude)
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_DEFAULT}
        tintColor="black"
        mapType={Platform.OS === "android" ? "standard" : "terrain"}
        showsPointsOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle="light"
      >
        {destinationLatitude && destinationLongitude && (
          <>
            <Marker
              key="destination"
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              image={icons.pin}
            />
            <MapViewDirections
              origin={{
                latitude: departureLatitude ?? userLatitude!,
                longitude: departureLongitude ?? userLongitude!,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={directionsAPI!}
              strokeColor="#0286FF"
              strokeWidth={2}
            />
          </>
        )}
      </MapView>
    </View>
  );
}
