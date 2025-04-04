import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import {
  fetchAPI,
  initiatePayment,
  initiateRefund,
  useFetch,
} from "@/lib/fetch";
import { Booking, Car, User } from "@/lib/definitions";
import { icons, images } from "@/constants";

import ReactNativeModal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import { RadioButton } from "@/components/RadioButton";
import { useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import uuid from "react-native-uuid";
import { LinearGradient } from "expo-linear-gradient";
import {
  calculateCancellationDetails,
  calculateDaysBetween,
} from "@/lib/utils";
import { MapWithMarkers } from "@/components/Geoapify";
import { addonIcons } from "@/constants/data";

const HistoryDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const params = useLocalSearchParams<{
    query?: string;
    callback?: string;
    completePayment?: string;
  }>();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  console.log("params", params);
  console.log("pathname", pathname);

  useEffect(() => {
    if (params.callback === "true" || params.completePayment === "true") {
      setShowSuccessModal(true);

      // const newParams = new URLSearchParams(params as Record<string, string>);

      // newParams.delete("callback");
      // newParams.delete("completePayment");

      // // Replace the URL without these parameters
      // router.replace(`?${newParams.toString()}`);
    }
    // setShowSuccessModal(false);
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
  } = useFetch<{ data: Car }>(`/(api)/car/${params.query}`, {
    method: "GET",
  });

  const car = carResponse?.data || null;

  const {
    data: userResponse,
    loading: userLoading,
    error: userError,
  } = useFetch<{ data: User }>(`/(api)/user/${user?.id || ""}`, {
    method: "GET",
  });

  const returnedUser = userResponse?.data || null;

  if (loading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }
  if (error || !response?.data) {
    return (
      <Text className="text-center mt-4">Error loading booking details.</Text>
    );
  }

  const windowHeight = Dimensions.get("window").height;

  const { daysDiff, cancellationFee, refundAmount } =
    calculateCancellationDetails(booking?.bookingDate, booking?.amount ?? 0);

  const handleCancelBooking = async () => {
    const cancelBookingData = {
      amount: refundAmount,
      remarks: "Cancel booking",
      first_name: user?.firstName,
      last_name: user?.lastName,
    };

    try {
      const response = await initiateRefund(id ?? "", cancelBookingData);

      if (response.refundResponses[0].status === "200") {
        setShowSuccessModal(true);
        setCancelBooking(true);
        console.log("dem", response);
      }
    } catch (error) {
      setShowErrorModal(true);
      console.error("Cancelling booking:", error);
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
      phoneNumber: returnedUser?.phone ?? user?.primaryPhoneNumber?.phoneNumber,
      description: "Complete car rental payment",
      callbackUrl: Linking.createURL(
        // eslint-disable-next-line prettier/prettier
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
  // Open the confirmation modal
  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  // Close the confirmation modal without cancelling
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  let numberOfDays = 0;
  if (booking?.bookingDate && booking.bookingEndDate) {
    numberOfDays = calculateDaysBetween(
      new Date(booking.bookingDate),
      new Date(booking.bookingEndDate)
    );
  } else if (booking?.bookingDate) {
    numberOfDays = 1;
  }

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
                onPress={() => router.push("/(root)/(tabs)/history")}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                {userLoading && !userError && (
                  <Text
                    numberOfLines={1}
                    className="text-secondary-100 text-start text-2xl font-rubik-bold"
                  >
                    Loading...
                  </Text>
                )}
              </View>

              <View className="flex flex-row items-center gap-3">
                {carLoading && !carError ? (
                  <Text
                    numberOfLines={1}
                    className="text-secondary-100 text-start text-2xl font-rubik-bold"
                  >
                    Loading...
                  </Text>
                ) : (
                  <View className="items-center ">
                    <Text className="text-sm font-rubik-bold text-secondary-100 px-4 py-2 bg-gray-100 rounded-full self-start">
                      {car?.brand.brandName}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Price text overlay at the bottom of the image */}
          <View className="absolute -bottom-6 w-full flex justify-center items-center z-50">
            {carLoading && !carError ? (
              <Text
                numberOfLines={1}
                className="text-secondary-100 text-start text-2xl font-rubik-bold"
              >
                Loading...
              </Text>
            ) : (
              <>
                <View className="flex flex-row items-center gap-3">
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-black-200 mt-1 font-rubik-medium">
                      ({car?.category.categoryName})
                    </Text>
                  </View>
                </View>
                <Text className="text-2xl font-rubik-extrabold">
                  {" "}
                  {car?.name}
                </Text>
              </>
            )}
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Directions
            </Text>

            <View className="flex w-full mt-4 py-4 rounded-lg relative">
              <View className="flex flex-row items-center">
                {/* Image section */}

                <MapWithMarkers
                  departureLatitude={Number(booking?.departureLatitude)}
                  destinationLatitude={Number(booking?.destinationLatitude)}
                  departureLongitude={Number(booking?.departureLongitude)}
                  destinationLongitude={Number(booking?.destinationLongitude)}
                />

                <View className="flex-1 ml-2">
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

                  <View className="flex items-start justify-between w-full gap-1">
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-base font-rubik-bold text-secondary-100">
                        <Image source={icons.list} className="size-3" />
                        {"   "}
                        {booking?.bookType === "full_day"
                          ? `Full day for ${numberOfDays} day(s)`
                          : "Transfer"}
                      </Text>
                    </View>
                    <Text className="text-base font-rubik-bold text-secondary-100">
                      <Image source={icons.calender} className="size-3" />
                      {booking?.bookingEndDate && "   From:"}
                      {"   "}
                      {new Date(
                        booking?.bookingDate ?? ""
                      ).toLocaleDateString()}
                      ,{" "}
                      {new Date(
                        booking?.bookingDate ?? ""
                      ).toLocaleTimeString()}
                    </Text>
                    {booking?.bookingEndDate && (
                      <Text className="text-base font-rubik-bold text-secondary-100">
                        <Image source={icons.calender} className="size-3" />
                        {booking?.bookingEndDate && "   To:"}
                        {"   "}
                        {new Date(
                          booking?.bookingEndDate ?? ""
                        ).toLocaleDateString()}
                        ,{" "}
                        {new Date(
                          booking?.bookingEndDate ?? ""
                        ).toLocaleTimeString()}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Addons
            </Text>
            <View className="flex-row justify-between mt-4">
              {booking?.addons?.map((addon, index) => {
                const icon = addonIcons[addon.addonName] || "❓";

                return (
                  <TouchableOpacity
                    key={index}
                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                  >
                    <Text className="text-xs text-secondary-600 font-rubik-medium">
                      {addon.addonValue}
                    </Text>
                    <View
                      className={`size-14 rounded-full flex items-center justify-center ${"border bg-primary-100"}`}
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

            <Text className="text-secondary-100 text-sm text-center font-rubik mt-2">
              Addons amount:{" "}
              {
                booking?.addons
                  ? booking.addons
                      .filter((addon) => addon.addonValue !== null) // Ensure null values are excluded
                      .reduce(
                        (total, addon) =>
                          total + (Number(addon.addonValue) || 0),
                        // eslint-disable-next-line prettier/prettier
                        0
                      )
                  : 0
                // Sum up all the addon values
              }
            </Text>
          </View>

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
          {booking?.paymentType === "reserve" &&
            booking.paymentStatus === "CONFIRMED" && (
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
            <Text className="text-primary-100 text-xs font-rubik-medium text-center">
              PAYMENT
              {
                <Text>
                  {" "}
                  {booking?.paymentStatus === "CONFIRMED" ? (
                    <Text className="text-secondary-100">Success</Text>
                  ) : booking?.paymentStatus === "PENDING" ? (
                    <Text className="text-primary-100">Processing...</Text>
                  ) : (
                    <Text className="text-red-500">Failed</Text>
                  )}
                </Text>
              }{" "}
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
              !["CANCELLED", "REFUNDED", "PROCEEDED", "NO SHOW"].includes(
                // eslint-disable-next-line prettier/prettier
                booking?.bookingStatus ?? ""
              ) && booking?.paymentStatus === "CONFIRMED"
                ? openConfirmationModal
                : () => {}
            }
            className={`flex-1 flex flex-row items-center justify-center py-2 rounded-full shadow-md shadow-zinc-400 ${
              booking?.bookingStatus === "CANCELLED"
                ? "bg-gray-200"
                : booking?.bookingStatus === "PENDING"
                  ? "bg-primary-100/70"
                  : booking?.bookingStatus === "PROCEEDED"
                    ? "bg-secondary-100"
                    : booking?.bookingStatus === "REFUNDED"
                      ? "bg-gray-200"
                      : booking?.bookingStatus === "NO SHOW"
                        ? "bg-red-400"
                        : "bg-secondary-100"
            }`}
          >
            <Text
              className={`text-lg text-center font-rubik-bold ${
                booking?.bookingStatus === "CANCELLED"
                  ? "text-red-500"
                  : booking?.bookingStatus === "PENDING"
                    ? "text-gray-700"
                    : booking?.bookingStatus === "PROCEEDED"
                      ? "text-gray-100"
                      : booking?.bookingStatus === "REFUNDED"
                        ? "text-gray-600"
                        : booking?.bookingStatus === "NO SHOW"
                          ? "text-gray-100"
                          : "text-white"
              }`}
            >
              {booking?.bookingStatus === "PENDING" &&
              ![
                "CANCELLED",
                "PENDING",
                "PROCEEDED",
                "REFUNDED",
                "NO SHOW",
                "FAILED",
              ].includes(booking?.paymentStatus)
                ? "Cancel booking"
                : booking?.paymentStatus === "PENDING"
                  ? "Awaiting payment..."
                  : booking?.bookingStatus === "PROCEEDED"
                    ? "Hope you enjoyed your ride"
                    : booking?.bookingStatus === "REFUNDED"
                      ? "Sorry you changed your mind"
                      : booking?.bookingStatus === "CANCELLED"
                        ? "Wait for refund"
                        : booking?.bookingStatus === "NO SHOW"
                          ? "You missed your ride"
                          : booking?.paymentStatus === "FAILED"
                            ? "Payment failed"
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
              : "Error occurred during processing of your booking. Go to profile -> Help to contact the admin for assistance"}
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
                  : `/(root)/${params.query}/book-details`
              );
            }}
            className="mt-5"
          />
          {booking?.paymentStatus !== "CONFIRMED" && cancelBooking !== true && (
            <CustomButton
              title="Cancel"
              onPress={() => {
                setShowSuccessModal(false);

                router.replace(`/(root)${pathname}?query=${params.query}`);
              }}
              className="mt-5"
            />
          )}
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
      <Modal
        visible={showConfirmationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View className="flex-1 inset-0 top-0 left-0 justify-center items-center bg-gray-800/70">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-xl mb-4 text-center">
              Are you sure you want to cancel the booking?
            </Text>
            <Text className="text-sm mb-4 text-center">
              View
              <Text
                className="text-primary-100"
                onPress={() => router.push("/(root)/help")}
              >
                {" "}
                Cancellation Policy{" "}
              </Text>{" "}
              for more details.
            </Text>
            <Text className="mb-2">
              Booking Date:{" "}
              {new Date(booking?.bookingDate ?? "").toLocaleDateString()}
            </Text>
            <Text className="mb-2">
              Days Until Pickup:{" "}
              {daysDiff > 0
                ? Number(daysDiff).toFixed(0)
                : "Pickup day is today"}
            </Text>
            <Text className="mb-2">
              Cancellation Fee: ${Number(cancellationFee ?? 0).toFixed(2)}
            </Text>
            <Text className="mb-4">
              Refund Amount: ${Number(refundAmount ?? 0).toFixed(2)}
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-red-500 p-3 rounded-lg w-24 items-center"
                onPress={closeConfirmationModal}
              >
                <Text className="text-white font-bold">No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-green-500 p-3 rounded-lg w-24 items-center"
                onPress={() => {
                  handleCancelBooking();
                  closeConfirmationModal();
                }}
              >
                <Text className="text-white font-bold">Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HistoryDetails;
