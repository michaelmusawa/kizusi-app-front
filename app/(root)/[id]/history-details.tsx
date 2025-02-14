import React, { useEffect, useState } from "react";
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
import { RadioButton } from "@/components/RadioButton";
import { Checkbox } from "@/components/CheckBox";
import * as Linking from "expo-linking";

const HistoryDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const params = useLocalSearchParams<{ query?: string; callback?: string }>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  console.log("the callback: ", params.callback);

  useEffect(() => {
    if (params.callback === "true") {
      setShowSuccessModal(true);
    }
  }, [params]);

  const {
    data: response,
    loading,
    error,
  } = useFetch<{ data: Booking }>(`/(api)/booking/${id}`, { method: "GET" });

  const booking = response?.data;

  const {
    data: carResponse,
    loading: carLoading,
    error: carError,
  } = useFetch<Car>(`/(api)/car/${params.query}`, {
    method: "GET",
  });

  const car = carResponse?.data;

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
    <View className="h-full">
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
          <View className="items-center px-4 py-2 bg-gray-100 rounded-full inline">
            <Text className="text-sm font-rubik-bold text-secondary-100">
              {car?.brand.brandName}
            </Text>
          </View>

          <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center gap-2">
              <Text className="text-black-200 mt-1 font-rubik-medium">
                ({car?.category.name})
              </Text>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Directions
            </Text>

            <View className="flex w-full mt-4 px-3 py-4 rounded-lg relative border">
              <View className="flex flex-row gap-2 items-center">
                {/* Image section */}
                <Image
                  source={{ uri: "" }}
                  className="w-1/3 h-32 rounded-lg border"
                />

                <View className="flex flex-col mt-2 gap-2 border w-full">
                  {/* From section */}
                  <View className="flex flex-row gap-2 items-center w-full">
                    <Image source={icons.pin} className="w-4 h-5" />
                    <Text className="flex text-base font-rubik-bold text-black-300 flex-wrap">
                      From: {booking?.departure}
                    </Text>
                  </View>

                  {/* To section */}
                  <View className="flex flex-row gap-2 items-center w-full">
                    <Image source={icons.marker} className="w-4 h-5" />
                    <Text className="text-base font-rubik-bold text-black-300 flex-wrap">
                      To: {booking?.destination}
                    </Text>
                  </View>

                  {/* Date and book type */}
                  <View className="flex flex-row items-center justify-between mt-2 w-full">
                    <Text className="text-base font-rubik-bold text-secondary-100">
                      Date:{" "}
                      {new Date(booking?.bookingDate).toLocaleDateString()},{" "}
                      {new Date(booking?.bookingDate).toLocaleTimeString()}
                    </Text>

                    <View className="flex flex-row items-center justify-between mt-2">
                      <Text className="text-base font-rubik-bold text-secondary-100">
                        {booking?.bookType}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Addons
            </Text>
            <View className="flex-row justify-between mt-4">
              {car?.addons?.map((addon, index) => {
                const icon = addonIcons[addon.addonName] || "❓";

                return (
                  <TouchableOpacity
                    key={index}
                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                  >
                    <Text className="text-xs text-secondary-600 font-rubik-medium">
                      +20/=
                    </Text>
                    <View
                      className={`size-14 rounded-full flex items-center justify-center ${
                        userAddons?.includes(addon.addonName)
                          ? "border bg-primary-100"
                          : "bg-primary-100/50"
                      }`}
                    >
                      <Text className="text-lg">{icon}</Text>
                    </View>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-black-300 text-sm text-center font-rubik mt-1.5"
                    >
                      {addon.addonName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {userAddons.length > 0 && (
              <Text className="text-secondary-100 text-sm text-center font-rubik mt-2">
                Addons amount: {addonsAmount}/=
              </Text>
            )}
          </View> */}

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Payment method
            </Text>

            <View className="flex-row justify-between mt-2">
              <View className="flex flex-row w-full border p-4">
                <View className="flex-1">
                  <View className="flex flex-1 flex-col min-w-16 max-w-20">
                    <RadioButton
                      label="Full amount"
                      value="full"
                      selected={booking?.paymentType === "full"}
                      onSelect={() => {}}
                    />
                  </View>

                  <View className="flex flex-1 flex-col min-w-16 max-w-20">
                    <RadioButton
                      label="Reserve"
                      value="reserve"
                      selected={booking?.paymentType === "reserve"}
                      onSelect={() => {}}
                    />
                  </View>
                </View>
                <View className="flex-1 flex-row mt-4">
                  {[
                    { icon: icons.pesapal, label: "Pesapal", value: "pesapal" },
                  ].map((addon, index) => (
                    <View
                      key={index}
                      className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                    >
                      <TouchableOpacity
                        className={
                          "bg-gray-100 rounded-full flex items-center justify-center p-2"
                        }
                      >
                        <Image
                          source={addon.icon}
                          alt={addon.label}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-black-300 text-sm text-center font-rubik mt-1.5"
                      >
                        {addon.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 py-4 px-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              {booking?.paymentStatus}
            </Text>
            <Text
              numberOfLines={1}
              className="text-secondary-100 text-start text-2xl font-rubik-bold"
            >
              ${booking?.amount}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-secondary-100/70 py-2 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-white text-lg text-center font-rubik-bold">
              Cancel
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
          <Text className="text-3xl font-JakartaBold text-center">Booked</Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            Your booking has been place successfully. You will be contacted soon
            by the admin.
          </Text>

          <CustomButton
            title={
              booking?.paymentStatus === "CONFIRMED"
                ? "View Booking"
                : "Try Again"
            }
            onPress={() => {
              setShowSuccessModal(false);
              router.push(
                booking?.paymentStatus === "CONFIRMED"
                  ? `/(root)/${id}/history-details?query=${params.query}`
                  : `/(root)//${params.query}/book-details`
              );
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default HistoryDetails;
