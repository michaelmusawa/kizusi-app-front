import { icons } from "@/constants";
import { Booking } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import { router } from "expo-router";
import { TouchableOpacity, Text, Image, View } from "react-native";

const BookingCard = ({ booking }: { booking: Booking }) => {
  console.log("booking", booking);
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
        Book type: {booking.bookType === "full_day" ? "Full Day" : "Transfer"}
      </Text>
      <View className="flex-row mt-4">
        <View className="flex-1">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${booking.destinationLongitude || booking.departureLongitude},${booking.destinationLatitude || booking.departureLatitude}&zoom=14&marker=lonlat:${booking.departureLongitude},${booking.departureLatitude}&icon=${encodeURIComponent("https://api.geoapify.com/v1/icon/?icon=location-pin&color=%23FF0000&size=medium&type=awesome&apiKey=YOUR_API_KEY")}${booking.destinationLongitude && booking.destinationLatitude ? `&marker=lonlat:${booking.destinationLongitude},${booking.destinationLatitude}&icon=${encodeURIComponent(`https://api.geoapify.com/v1/icon/?icon=location-pin&color=%2300FF00&size=medium&type=awesome&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`)}` : ""}&path=lonlat:${booking.departureLongitude},${booking.departureLatitude}|lonlat:${booking.destinationLongitude},${booking.destinationLatitude}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[150px] h-[90px] rounded-lg"
          />
          <View className="mt-4 flex flex-col gap-2">
            <Text className="text-gray-700">
              <Text className="font-bold">Car: </Text>
              {booking.carName}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Payment status: </Text>
              <Text
                className={`${booking.paymentType === "full" ? "text-secondary-100" : "text-red-500"}`}
              >
                {booking.paymentType === "full"
                  ? "Full payment"
                  : "Half payment"}
              </Text>
              <Text>
                {" "}
                (
                {booking.paymentStatus === "CONFIRMED" ? (
                  <Text className="text-secondary-100">Success</Text>
                ) : booking.paymentStatus === "PENDING" ? (
                  <Text className="text-primary-100">Processing...</Text>
                ) : (
                  <Text className="text-red-500">Failed</Text>
                )}
                )
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
            <Text className="text-gray-700">
              <Text className="text-secondary-100">
                {booking.bookingStatus}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BookingCard;
