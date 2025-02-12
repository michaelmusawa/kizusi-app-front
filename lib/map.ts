import { MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_PLACES_API_KEY;

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateTimes = async ({
  departureLatitude,
  departureLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  departureLatitude: number | null;
  departureLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !departureLatitude ||
    !departureLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  ) {
    return;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${departureLatitude},${departureLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
    );

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      console.error("No routes found.");
      return;
    }

    const timeToDestination = data.routes[0].legs[0].duration.value; // Time in seconds
    const totalTime = timeToDestination / 60; // Convert to minutes
    const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time

    return { time: totalTime, price };
  } catch (error) {
    console.error("Error calculating times:", error);
  }
};
