import { icons } from "@/constants";
import { Booking } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import { router } from "expo-router";
import { TouchableOpacity, Text, Image, View } from "react-native";
import MapWithMarkers, { HistoryMapWithMarkers } from "./Geoapify";

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          `/(root)/${booking.id}/history-details?query=${booking.carId}`
        )
      }
      className="bg-white rounded-lg shadow-md p-4 mb-4"
    >
      <Text className="text-primary-100 font-bold">
        <Text className="text-gray-800">Book type:</Text>{" "}
        {booking.bookType === "full_day" ? "Full Day" : "Transfer"}
      </Text>
      <View className="flex-row mt-4">
        <View className="flex-1">
          <HistoryMapWithMarkers
            departureLatitude={booking.departureLatitude}
            destinationLatitude={booking?.destinationLatitude}
            departureLongitude={booking.departureLongitude}
            destinationLongitude={booking?.destinationLongitude}
          />
          <View className="mt-4 flex flex-col gap-2">
            <Text className="text-gray-700">
              <Text className="font-bold">Car: </Text>
              {booking.carName}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Payment: </Text>
              <Text
                className={`${booking.paymentType === "full" ? "text-secondary-100" : "text-red-500"}`}
              >
                {booking.paymentType === "full"
                  ? "Full payment"
                  : "Half payment"}
              </Text>
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Payment status: </Text>
              <Text>
                {" "}
                {booking.paymentStatus === "CONFIRMED" ? (
                  <Text className="text-secondary-100">Success</Text>
                ) : booking.paymentStatus === "PENDING" ? (
                  <Text className="text-primary-100">Processing...</Text>
                ) : (
                  <Text className="text-red-500">Failed</Text>
                )}
              </Text>
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Amount: </Text>
              <Text className="text-secondary-100">Ksh. {booking.amount}</Text>
            </Text>
          </View>
        </View>
        <View className="flex-1 ml-4">
          <View className="flex-row items-center mb-2">
            <Image source={icons.point} className="h-5 w-5" />
            <Text className="ml-2 font-semibold">{booking.departure}</Text>
          </View>
          {booking.destination && (
            <View className="flex-row items-center mb-2">
              <Image source={icons.to} className="h-5 w-5" />
              <Text className="ml-2 font-semibold">{booking.destination}</Text>
            </View>
          )}

          <Text className="text-gray-500">
            {formatDate(booking.bookingDate.toLocaleString())}
          </Text>

          <View className="flex flex-row mt-6 mb-8 gap-2 justify-center items-center">
            <View
              className={
                booking.bookingStatus === "PENDING"
                  ? "bg-amber-200 p-2 rounded-lg"
                  : booking.bookingStatus === "CANCELLED"
                    ? "bg-red-500 p-2 rounded-lg"
                    : "bg-secondary-100 p-2 rounded-lg"
              }
            >
              <Text
                className={
                  booking.bookingStatus === "PENDING"
                    ? "text-gray-700 font-JakartaSemiBold"
                    : booking.bookingStatus === "CANCELLED"
                      ? "text-gray-100 font-JakartaSemiBold"
                      : "text-white font-JakartaSemiBold"
                }
              >
                {booking.bookingStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BookingCard;
