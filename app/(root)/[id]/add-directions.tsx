import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { DateTimePickerComponent } from "@/components/DateTimePicker";
import { Picker } from "@react-native-picker/picker";
import { calculateTimes } from "@/lib/map";
import { useFetch } from "@/lib/fetch";
import { Car } from "@/lib/definitions";

export default function AddDirections() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const {
    departureLatitude,
    departureLongitude,
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
    departureAddress,
    bookType,
    rideDetails,
    setDestinationLocation,
    setDepartureLocation,
    setBookType,
    setRideDetails,
    date,
  } = useLocationStore();

  const [localDepartureAddress, setLocalDepartureAddress] =
    useState(departureAddress);
  const [localDestinationAddress, setLocalDestinationAddress] =
    useState(destinationAddress);
  const [localBookType, setLocalBookType] = useState(bookType);
  const [localRideDetails, setLocalRideDetails] = useState<{
    time: number | null;
    price: number | null;
  }>({
    time: 0,
    price: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [viewOptions, setViewOptions] = useState<boolean>(false);

  // Sync local state with store updates
  useEffect(() => {
    if (rideDetails) {
      setLocalRideDetails(rideDetails);
    }
  }, [rideDetails]);

  useEffect(() => {
    setLocalDestinationAddress(destinationAddress);
  }, [destinationAddress]);

  useEffect(() => {
    setLocalDepartureAddress(departureAddress);
  }, [departureAddress, localDepartureAddress]);

  useEffect(() => {
    setLocalBookType(bookType);
  }, [bookType]);

  useEffect(() => {
    if (
      departureLatitude !== undefined &&
      departureLongitude !== undefined &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      calculateTimes({
        departureLatitude,
        departureLongitude,
        destinationLatitude,
        destinationLongitude,
      })
        .then((result) => {
          if (result) {
            setRideDetails(result); // ✅ Correct usage
          }
        })
        .catch((error) => {
          console.error("Error fetching ride details:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    departureLatitude,
    departureLongitude,
    destinationLatitude,
    destinationLongitude,
  ]);

  const {
    data: response,
    loading: carLoading,
    error: carError,
  } = useFetch<{ data: Car }>(`/(api)/car/${id ?? ""}`, {
    method: "GET",
  });

  const car = response?.data;

  const handleProceedToBook = () => {
    if (localBookType === null) {
      setError("Select book type");
      return;
    }

    if (!date || new Date(date).toString() === "Invalid Date") {
      setError("Please select a valid date.");
      return;
    }

    if (new Date(date) < new Date()) {
      setError("Date cannot be in the past.");
      return;
    }

    if (
      localBookType === "full_day" &&
      (departureLatitude === null || departureLongitude === null)
    ) {
      setError("Departure location is required.");
      setLocalDestinationAddress(null);
      return;
    }

    if (
      localBookType === "transfer" &&
      (departureLatitude === null ||
        departureLongitude === null ||
        destinationLatitude === null ||
        destinationLongitude === null)
    ) {
      setError("Both departure and destination locations are required.");
      return;
    }

    setError(null);
    router.push(`/${id}/book-details`);
  };

  const SelectComponent = () => {
    return (
      <View className="flex-1">
        <Text className="text-lg mb-2">Select book type:</Text>
        <View
          className={` rounded-md gap-2 ${viewOptions ? "" : "border border-gray-300"}`}
        >
          {viewOptions ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setViewOptions(false);
                  setBookType({ bookType: "full_day" });
                }}
                className="p-2 border border-gray-300 rounded-md"
              >
                <Text>Full day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setViewOptions(false);
                  setBookType({ bookType: "transfer" });
                }}
                className="p-2 border border-gray-300 rounded-md"
              >
                <Text>Transfer</Text>
              </TouchableOpacity>
            </>
          ) : bookType ? (
            <TouchableOpacity
              onPress={() => setViewOptions(true)}
              className="p-2"
            >
              <Text>{bookType === "transfer" ? "Transfer" : "Full day"}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setViewOptions(true)}
              className="p-2"
            >
              <Text>Select</Text>
            </TouchableOpacity>
          )}

          {/* <Picker
            selectedValue={localBookType}
            onValueChange={(itemValue, index) =>
              setBookType({ bookType: itemValue || "" })
            }
            style={{ width: 140, height: 46 }}
          >
            <Picker.Item label="Select book type" value={null} />
            <Picker.Item label="Full Day" value="full_day" />
            <Picker.Item label="Transfer" value="transfer" />
          </Picker> */}
        </View>
      </View>
    );
  };

  return (
    <>
      <RideLayout title="Car details" snapPoints={["45%", "85%"]}>
        {error && <Text className="text-red-500 text-center">{error}</Text>}
        <View className="flex flex-row">
          <View className="flex-1">
            <SelectComponent />
          </View>

          <View className="flex-1">
            <DateTimePickerComponent />
          </View>
        </View>

        <View className="my-3">
          <Text className="text-base font-JakartaSemiBold mb-3">From</Text>

          <GoogleTextInput
            icon={icons.target}
            initialLocation={localDepartureAddress!}
            containerStyle="bg-neutral-100"
            textInputBackgroundColor="#f5f5f5"
            handlePress={(location) => {
              setDepartureLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
              });
            }}
          />
        </View>

        {localBookType === "transfer" && (
          <View className="my-3">
            <Text className="text-base font-JakartaSemiBold mb-3">To</Text>

            <GoogleTextInput
              icon={icons.map}
              initialLocation={localDestinationAddress!}
              containerStyle="bg-neutral-100"
              textInputBackgroundColor="transparent"
              handlePress={(location) => {
                setDestinationLocation({
                  latitude: location.latitude,
                  longitude: location.longitude,
                  address: location.address,
                });
              }}
            />
          </View>
        )}
      </RideLayout>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>

            {carError ? (
              <Text
                numberOfLines={1}
                className="text-red-500 text-start text-2xl font-rubik-bold"
              >
                Loading...
              </Text>
            ) : carLoading ? (
              <Text
                numberOfLines={1}
                className="text-secondary-100 text-start text-2xl font-rubik-bold"
              >
                Loading...
              </Text>
            ) : bookType === "transfer" ? (
              <Text
                numberOfLines={1}
                className="text-secondary-100 text-start text-2xl font-rubik-bold"
              >
                $
                {((car?.price ?? 0 / 1440) * (rideDetails?.time ?? 0)).toFixed(
                  // eslint-disable-next-line prettier/prettier
                  2
                )}
              </Text>
            ) : (
              <Text
                numberOfLines={1}
                className="text-secondary-100 text-start text-2xl font-rubik-bold"
              >
                ${car?.price}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleProceedToBook}
            className="flex-1 flex flex-row items-center justify-center bg-secondary-100 py-2 rounded-full shadow-md shadow-zinc-400"
          >
            <Text className="text-white text-lg text-center font-rubik-bold">
              Proceed to book
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
