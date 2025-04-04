import { icons } from "@/constants";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Image } from "react-native";

const directionsAPI = process.env.EXPO_PUBLIC_PLACES_API_KEY;

interface MapProps {
  departureLongitude: number;
  departureLatitude: number;
  destinationLongitude?: number;
  destinationLatitude?: number;
}

function MapWithMarkers({
  departureLongitude,
  departureLatitude,
  destinationLongitude,
  destinationLatitude,
}: MapProps) {
  const [region, setRegion] = useState({
    latitude: departureLatitude,
    longitude: departureLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    const hasDestination = destinationLatitude && destinationLongitude;

    const newRegion = {
      latitude: hasDestination
        ? (departureLatitude + destinationLatitude) / 2
        : departureLatitude,
      longitude: hasDestination
        ? (departureLongitude + destinationLongitude) / 2
        : departureLongitude,
      latitudeDelta: hasDestination ? 0.2 : 0.01,
      longitudeDelta: hasDestination ? 0.2 : 0.01,
    };

    setRegion(newRegion);
  }, [
    departureLatitude,
    departureLongitude,
    destinationLatitude,
    destinationLongitude,
  ]);

  if (!departureLatitude && !departureLongitude)
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  return (
    <View className="w-1/2 h-40 rounded-lg overflow-hidden">
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_DEFAULT}
        tintColor="black"
        region={region}
        mapType={Platform.OS === "android" ? "standard" : "terrain"}
        showsPointsOfInterest={false}
        showsUserLocation={false}
        userInterfaceStyle="light"
      >
        <Marker
          key="departure"
          coordinate={{
            latitude: departureLatitude,
            longitude: departureLongitude,
          }}
          title="Departure"
          description="Starting point"
          image={icons.selectedMarker}
        />

        {destinationLatitude && destinationLongitude ? (
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
                latitude: departureLatitude,
                longitude: departureLongitude,
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
        ) : null}
      </MapView>
    </View>
  );
}

const HistoryMapWithMarkers = ({
  departureLongitude,
  departureLatitude,
  destinationLongitude,
  destinationLatitude,
}: {
  departureLongitude: number;
  departureLatitude: number;
  destinationLongitude: number | undefined;
  destinationLatitude: number | undefined;
}) => {
  const hasDestination = destinationLongitude && destinationLatitude;

  // Center calculation
  const centerLon = hasDestination
    ? (departureLongitude + destinationLongitude) / 2
    : departureLongitude;
  const centerLat = hasDestination
    ? (departureLatitude + destinationLatitude) / 2
    : departureLatitude;

  // Base URL
  let mapUrl =
    `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=800&height=600` +
    `&center=lonlat:${centerLon},${centerLat}` +
    `&zoom=${hasDestination ? 12 : 16}`;

  // Departure marker (always present)
  mapUrl += `&marker=lonlat:${departureLongitude},${departureLatitude};type:awesome;color:%234c905a;size:x-large;icon:location-pin`;

  // Destination marker and path (only when both exist)
  if (hasDestination) {
    mapUrl += `|lonlat:${destinationLongitude},${destinationLatitude};type:awesome;color:%23bb3f73;size:x-large;icon:location-pin`;

    // Add path between points
    mapUrl += `&path=${departureLatitude}|${departureLongitude}|${destinationLatitude}|${destinationLongitude}`;
  }

  // Finalize URL
  mapUrl += `&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

  return <Image source={{ uri: mapUrl }} className="w-full h-32 rounded-lg" />;
};

export { MapWithMarkers, HistoryMapWithMarkers };
