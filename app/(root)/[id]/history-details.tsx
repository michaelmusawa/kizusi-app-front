import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { Booking, Car } from "@/lib/definitions";
import { icons, carImages, images } from "@/constants";
import { featureIcons } from "@/constants/data";
import ReactNativeModal from "react-native-modal";
import CustomButton from "@/components/CustomButton";

const HistoryDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    data: response,
    loading,
    error,
  } = useFetch<{ data: Booking }>(`/(api)/booking/${id}`, { method: "GET" });

  const booking = response?.data;

  console.log("the booking", booking);

  const carId = booking?.carId;

  console.log("car id", carId);
  console.log("car id", carId);

  const {
    data: carResponse,
    loading: carLoading,
    error: carError,
  } = useFetch<Car>(`/(api)/car/${carId}`, {
    method: "GET",
  });

  const car = carResponse?.data;

  console.log("The car", car);
  console.log("The car", car);

  if (loading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }
  if (error || !response?.data) {
    return (
      <Text className="text-center mt-4">Error loading booking details.</Text>
    );
  }

  const windowHeight = Dimensions.get("window").height;

  const handleCancelBooking = async () => {
    try {
      const response = await fetchAPI(`/(api)/booking/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Cancel booking response", response.booking.bookingStatus);
      const success = response.booking.bookingStatus === "CANCELLED";

      if (success) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Cancelling booking:", error);
      throw error;
    }
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View
          className="relative w-full flex justify-center items-center"
          style={{ height: windowHeight / 4 }}
        >
          <Image
            source={carImages.audiCar}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.favorite}
                  className="size-7"
                  tintColor={"#191D31"}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {car?.brand.brandName}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                ({car?.category.name})
              </Text>
            </View>
          </View>

          <View className="flex flex-row flex-wrap items-center mt-5">
            {car?.features?.map((feature, index) => {
              const icon =
                featureIcons[feature.featureName.toLowerCase()] || icons.star; // Fallback to a default icon

              return (
                <View
                  key={index}
                  className="flex flex-row items-center mr-4 mb-2"
                >
                  <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                    <Image source={icon} className="size-4" />
                  </View>
                  <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                    {feature.featureValue} {feature.featureName}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="mt-7">
          <Text className="text-black-300 text-xl font-rubik-bold">
            Directions
          </Text>
          <TouchableOpacity className="flex w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative">
            <View className="flex flex-row gap-2 items-center">
              <Image
                source={{ uri: "" }}
                className="w-1/3 h-32 rounded-lg border"
              />

              <View className="flex flex-col mt-2 gap-2">
                <View className="flex flex-row gap-2 items-center">
                  <Image source={icons.pin} className="w-4 h-5" />
                  <Text className="text-base font-rubik-bold text-black-300">
                    Departure: {booking?.departure}
                  </Text>
                </View>

                <View className="flex flex-row gap-2 items-center">
                  <Image source={icons.marker} className="w-4 h-5" />
                  <Text className="text-base font-rubik-bold text-black-300">
                    Destination: {booking?.destination}
                  </Text>
                </View>

                <View className="flex flex-row items-center justify-between mt-2">
                  <Text className="text-base font-rubik-bold text-primary-300">
                    {booking?.bookingDate.toLocaleString()}
                  </Text>

                  <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-rubik-bold text-primary-300">
                      {booking?.bookType}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-7">
          <Text className="text-black-300 text-xl font-rubik-bold">
            Payment method
          </Text>

          <View className="flex-col justify-between mt-4">
            <View className="flex flex-1 flex-col min-w-16 max-w-20">
              <Text>{booking?.paymentType}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${car?.price}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCancelBooking}
            className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400"
          >
            <Text className="text-white text-lg text-center font-rubik-bold">
              Cancel booking
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            Verified
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You have successfully cancelled booking.
          </Text>

          <CustomButton
            title="Back to history"
            onPress={() => {
              setShowSuccessModal(false);
              router.push("/(root)/(tabs)/history");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default HistoryDetails;
