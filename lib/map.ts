import { MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_PLACES_API_KEY;

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  departureLatitude,
  departureLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  departureLatitude?: number | null;
  departureLongitude?: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  // If user coordinates are missing
  if (!userLatitude || !userLongitude) {
    return {
      latitude: -1.286389,
      longitude: 36.817223,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  // If destination coordinates are missing
  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: departureLatitude ?? userLatitude,
      longitude: departureLongitude ?? userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(
    departureLatitude ?? userLatitude,
    destinationLatitude
  );
  const maxLat = Math.max(
    departureLatitude ?? userLatitude,
    destinationLatitude
  );
  const minLng = Math.min(
    departureLongitude ?? userLongitude,
    destinationLongitude
  );
  const maxLng = Math.max(
    departureLongitude ?? userLongitude,
    destinationLongitude
  );

  // Calculate deltas
  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  // Calculate midpoint between departure and destination
  const latitude =
    ((departureLatitude ?? userLatitude) +
      (destinationLatitude ?? userLatitude)) /
    2;
  const longitude =
    ((departureLongitude ?? userLongitude) +
      (destinationLongitude ?? userLongitude)) /
    2;

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

    const timeToDestination = data.routes[0].legs[0].duration.value;
    const totalTime = timeToDestination / 60;
    const price = totalTime * 0.5;

    return { time: totalTime, price };
  } catch (error) {
    console.error("Error calculating times:", error);
  }
};
