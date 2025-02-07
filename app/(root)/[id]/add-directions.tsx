import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { DateTimePickerComponent } from "@/components/DateTimePicker";
import { Picker } from "@react-native-picker/picker";

export default function AddDirections() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const {
    destinationAddress,
    departureAddress,
    bookType,
    setDestinationLocation,
    setDepartureLocation,
    setBookType,
  } = useLocationStore();

  const [localDepartureAddress, setLocalDepartureAddress] =
    useState(departureAddress);
  const [localDestinationAddress, setLocalDestinationAddress] =
    useState(destinationAddress);
  const [localBookType, setLocalBookType] = useState(bookType);

  // Sync local state with store updates

  useEffect(() => {
    setLocalDestinationAddress(destinationAddress);
  }, [destinationAddress]);

  useEffect(() => {
    setLocalDepartureAddress(departureAddress);
  }, [departureAddress]);

  useEffect(() => {
    setLocalBookType(bookType);
  }, [bookType]);

  const SelectComponent = () => {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg mb-2">Select book type:</Text>
        <View className="border border-gray-300 rounded-md">
          <Picker
            selectedValue={localBookType}
            onValueChange={(itemValue, index) =>
              setBookType({ bookType: itemValue })
            }
            style={{ width: 140, height: 48 }}
          >
            <Picker.Item label="Full Day" value="full_day" />
            <Picker.Item label="Transfer" value="transfer" />
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <RideLayout title="Car details" snapPoints={["85%"]}>
      <View className="flex flex-row">
        <View className="flex-1">
          <SelectComponent />
        </View>

        <View className="flex-1">
          <DateTimePickerComponent />
        </View>
      </View>

      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>

        <GoogleTextInput
          key={localDepartureAddress}
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
          <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>

          <GoogleTextInput
            key={localDestinationAddress}
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

      <View className="mt-6 mb-8">
        <CustomButton
          title="Save details"
          onPress={() => {
            router.push(`/${id}/book-details`);
          }}
          className="mt-5"
        />
      </View>
    </RideLayout>
  );
}
