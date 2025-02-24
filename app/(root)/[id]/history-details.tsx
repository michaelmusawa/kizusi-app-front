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
import {
  fetchAPI,
  initiatePayment,
  initiateRefund,
  useFetch,
} from "@/lib/fetch";
import { Booking, Car } from "@/lib/definitions";
import { icons, images } from "@/constants";

import ReactNativeModal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import { RadioButton } from "@/components/RadioButton";
import { useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import uuid from "react-native-uuid";
import { LinearGradient } from "expo-linear-gradient";

const HistoryDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const params = useLocalSearchParams<{
    query?: string;
    callback?: string;
    completePayment?: string;
  }>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (params.callback === "true" || params.completePayment === "true") {
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

  const {
    data: userResponse,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(`/(api)/user/${user?.id || ""}`, {
    method: "GET",
  });

  const returnedUser = userResponse?.data;

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
    const cancelBookingData = {
      amount: booking?.amount,
      remarks: "Cancel booking",
      first_name: user?.firstName,
      last_name: user?.lastName,
    };

    try {
      const response = await initiateRefund(id, cancelBookingData);

      if (response.refundResponses[0].status === "200") {
        setShowSuccessModal(true);
        setCancelBooking(true);
        console.log("dem", response);
      }
    } catch (error) {
      setShowErrorModal(true);
      console.error("Cancelling booking:", error);

      throw error;
    }
  };

  const handlePayment = async () => {
    const reference = uuid.v4();
    const paymentData = {
      reference: reference,
      bookingId: booking?.id,
      first_name: user?.firstName,
      last_name: user?.lastName,
      userId: user?.id,
      email: returnedUser?.email ?? user?.primaryEmailAddress?.emailAddress,
      phoneNumber: returnedUser?.phone ?? user?.primaryPhoneNumber,
      description: "Complete car rental payment",
      callbackUrl: Linking.createURL(
        `/(root)/${id}/history-details?query=${params.query}&completePayment=true`
      ),
    };

    console.log("the payment data", paymentData);

    try {
      await initiatePayment(paymentData);
    } catch (error) {
      console.error("Payment initiation failed:", error);
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
          style={{ height: windowHeight / 3 }}
        >
          <Image
            source={{ uri: car?.image }}
            className="size-full"
            resizeMode="cover"
          />

          {/* Bottom Linear Gradient overlay */}
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{ top: Platform.OS === "ios" ? 70 : 20 }}
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
          <View className="items-start">
            <Text className="text-sm font-rubik-bold text-secondary-100 px-4 py-2 bg-gray-100 rounded-full">
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

            <View className="flex w-full mt-4 px-3 py-4 rounded-lg relative">
              <View className="flex flex-row gap-2 items-center">
                {/* Image section */}
                <Image
                  source={{
                    uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${booking.destinationLongitude || booking.departureLongitude},${booking.destinationLatitude || booking.departureLatitude}&zoom=14&marker=lonlat:${booking.departureLongitude},${booking.departureLatitude}&icon=${encodeURIComponent("https://api.geoapify.com/v1/icon/?icon=location-pin&color=%23FF0000&size=medium&type=awesome&apiKey=YOUR_API_KEY")}${booking.destinationLongitude && booking.destinationLatitude ? `&marker=lonlat:${booking.destinationLongitude},${booking.destinationLatitude}&icon=${encodeURIComponent(`https://api.geoapify.com/v1/icon/?icon=location-pin&color=%2300FF00&size=medium&type=awesome&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`)}` : ""}&path=lonlat:${booking.departureLongitude},${booking.departureLatitude}|lonlat:${booking.destinationLongitude},${booking.destinationLatitude}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
                  }}
                  className="w-1/3 h-32 rounded-lg"
                />

                <View className="flex-1 ml-4">
                  <View className="flex-row items-center mb-2">
                    <Image source={icons.point} className="h-5 w-5" />
                    <Text className="ml-2 font-semibold">
                      {booking?.departure}
                    </Text>
                  </View>
                  {booking?.destination && (
                    <View className="flex-row items-center mb-2">
                      <Image source={icons.to} className="h-5 w-5" />
                      <Text className="ml-2 font-semibold">
                        {booking.destination}
                      </Text>
                    </View>
                  )}

                  {/* Date and book type */}
                  <View className="flex flex-row items-center justify-between mt-2 w-full">
                    <View className="flex flex-row items-center justify-between mt-2">
                      <Text className="text-base font-rubik-bold text-secondary-100">
                        {booking?.bookType === "full_day"
                          ? "Full day"
                          : "Transfer"}
                      </Text>
                    </View>
                    <Text className="text-base font-rubik-bold text-secondary-100">
                      {new Date(booking?.bookingDate).toLocaleDateString()},{" "}
                      {new Date(booking?.bookingDate).toLocaleTimeString()}
                    </Text>
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
              <View className="flex flex-row w-full p-4">
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
          {booking?.paymentType === "reserve" && (
            <View className="mt-4 p-4 bg-primary-100/50 rounded-lg">
              <Text className="text-black-300 text-base font-rubik-medium">
                A full payment is required before the booking date to confirm
                your reservation.
              </Text>
              <View className="bg-white bottom-0 w-full rounded-2xl border-t border border-primary-200 py-4 px-7">
                <View className="flex flex-row items-center justify-between gap-10">
                  <View className="flex flex-col items-center">
                    <Text className="text-black text-xs font-rubik-medium">
                      Payment balance
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-red-500 text-start text-2xl font-rubik-bold"
                    >
                      ${booking?.amount}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={handlePayment}
                    className="flex-1 flex flex-row items-center justify-center bg-gray-100 py-2 rounded-full shadow-md shadow-zinc-400"
                  >
                    <Text className="text-gray-600 text-lg text-center font-rubik-bold">
                      Complete payment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 py-4 px-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-center">
            <Text className="text-green-600 text-xs font-rubik-medium text-center">
              {booking?.paymentStatus} PAYMENT
            </Text>
            <Text
              numberOfLines={1}
              className="text-secondary-100 text-start text-2xl font-rubik-bold"
            >
              ${booking?.amount}
            </Text>
          </View>

          <TouchableOpacity
            onPress={
              booking?.bookingStatus !== "CANCELLED"
                ? handleCancelBooking
                : () => {}
            }
            className={`flex-1 flex flex-row items-center justify-center py-2 rounded-full shadow-md shadow-zinc-400 ${booking?.bookingStatus !== "CANCELLED" ? "bg-secondary-100" : "bg-gray-100"}`}
          >
            <Text
              className={` text-lg text-center font-rubik-bold ${booking?.bookingStatus !== "CANCELLED" ? "text-white" : "text-red-500"}`}
            >
              {booking?.bookingStatus !== "CANCELLED"
                ? "Cancel booking"
                : "Booking cancelled"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={
              booking?.paymentStatus === "CONFIRMED"
                ? images.check
                : images.error
            }
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            {booking?.paymentStatus === "CONFIRMED"
              ? cancelBooking === true
                ? "Cancelled"
                : params.callback === "true"
                  ? "Booked"
                  : "Payment completed"
              : "Error occurred"}
          </Text>

          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            {booking?.paymentStatus === "CONFIRMED"
              ? cancelBooking === true
                ? "The booking has been cancelled successfully. You will be conducted by the admin for your refund soon. Go to profile -> Help for more information."
                : params.callback === "true"
                  ? "Your booking has been place successfully. You will be contacted soon by the admin."
                  : "You have completed your booking payment successfully."
              : "Error occurred"}
          </Text>

          <CustomButton
            title={
              booking?.paymentStatus === "CONFIRMED" || cancelBooking === true
                ? "View Booking"
                : "Try Again"
            }
            onPress={() => {
              setShowSuccessModal(false);
              if (cancelBooking === true) {
                setCancelBooking(false);
              }
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

      <ReactNativeModal isVisible={showErrorModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.error}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            Error occurred
          </Text>

          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            {
              "Error occurred during placement of your refund. Go to profile -> Help to contact the admin for assistance. "
            }
          </Text>

          <CustomButton
            title="View Booking"
            onPress={() => {
              setShowErrorModal(false);
              router.push(
                `/(root)/${id}/history-details?query=${params.query}`
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
