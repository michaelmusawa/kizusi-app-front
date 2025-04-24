import { useEffect } from "react";
import * as Location from "expo-location";
import { useLocationStore } from "@/store";

export const useUserLocation = () => {
  const { setUserLocation } = useLocationStore();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const { coords } = await Location.getCurrentPositionAsync();
      const [addr] = await Location.reverseGeocodeAsync(coords);
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: `${addr.name}, ${addr.region}`,
      });
    })();
  }, [setUserLocation]);
};
