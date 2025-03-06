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
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Car, User } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/CheckBox";
import { RadioButton } from "@/components/RadioButton";
import { initiatePayment } from "@/lib/fetch";
import { addonIcons } from "@/constants/data";
import { useLocationStore } from "@/store";
import { useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import uuid from "react-native-uuid";
import { LinearGradient } from "expo-linear-gradient";

const BookDetails = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [paymentOption, setPaymentOption] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("full");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const {
    userAddons,
    date,
    departureLatitude,
    departureLongitude,
    destinationLatitude,
    destinationLongitude,
    departureAddress,
    destinationAddress,
    bookType,
    rideDetails,
  } = useLocationStore();

  const {
    data: carResponse,
    loading: carLoading,
    error: carError,
  } = useFetch<{ data: Car }>(`/(api)/car/${id || ""}`, {
    method: "GET",
  });

  const car = carResponse?.data;

  const {
    data: response,
    loading: userLoading,
    error: userError,
  } = useFetch<{ data: User | null }>(`/(api)/user/${user?.id || ""}`, {
    method: "GET",
  });

  const returnedUser = response?.data || null;

  const windowHeight = Dimensions.get("window").height;

  const handleCheckboxChange = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const handleSelect = (value: string) => {
    setPaymentOption(value);
  };

  const handleSelectPaymentType = (value: string) => {
    setPaymentType(value);
  };

  const calculateAddonsAmount = () => {
    if (!(userAddons && car?.addons)) {
      return;
    }
    if (userAddons?.length > 0 && car?.addons?.length > 0) {
      const totalAmount = car.addons.reduce((total, addon) => {
        if (userAddons.includes(addon.addonName)) {
          return total + parseFloat(addon.addonValue);
        }
        return total;
      }, 0);

      return totalAmount;
    }

    return 0;
  };

  let rideAmount = 0;
  const addonsAmount = calculateAddonsAmount();

  if (bookType === "full_day") {
    rideAmount = Number((Number(car?.price) || 0).toFixed(2));
  } else if (rideDetails?.time && car?.price) {
    rideAmount = Number(
      ((rideDetails.time * Number(car?.price)) / 1440).toFixed(2)
    );
  }

  useEffect(() => {
    if (paymentType === "full") {
      setPaymentAmount(rideAmount + (addonsAmount || 0));
    } else if (paymentType === "reserve") {
      setPaymentAmount((rideAmount + (addonsAmount || 0)) / 2);
    }
  }, [rideAmount, paymentType, addonsAmount]);

  const handlePayment = async () => {
    if (!isAgreed) {
      setError("You have to agree with the terms and conditions to continue");
      return;
    }

    const reference = uuid.v4();
    const paymentData = {
      amount: paymentAmount,
      first_name: user?.firstName,
      last_name: user?.lastName,
      email: returnedUser?.email ?? user?.primaryEmailAddress?.emailAddress,
      phoneNumber: returnedUser?.phone ?? user?.primaryPhoneNumber,
      image:
        returnedUser?.image ??
        user?.externalAccounts?.[0]?.imageUrl ??
        user?.imageUrl,
      carId: id,
      reference: reference,
      userId: user?.id,
      bookingDate: date,
      departureLatitude: departureLatitude,
      departureLongitude: departureLongitude,
      destinationLatitude: destinationLatitude,
      destinationLongitude: destinationLongitude,
      departure: departureAddress,
      destination: destinationAddress,
      bookType: bookType,
      paymentType: paymentType,
      addons: userAddons,
      description: "Car Rental Payment",
      callbackUrl: Linking.createURL(
        `/(root)/${reference}/history-details?query=${id}&callback=true`
      ),
    };

    try {
      await initiatePayment(paymentData);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  if (carLoading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (carError) {
    return <Text className="text-center mt-4">Error loading details.</Text>;
  }

  return (
    <View>
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
                <View className="items-center ">
                  <Text className="text-sm font-rubik-bold text-secondary-100 px-4 py-2 bg-gray-100 rounded-full self-start">
                    {car?.brand.brandName}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Price text overlay at the bottom of the image */}
          <View className="absolute -bottom-6 w-full flex justify-center items-center z-50">
            <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>

            <View className="flex flex-row items-center gap-3">
              <View className="flex flex-row items-center gap-2">
                <Text className="text-black-200 mt-1 font-rubik-medium">
                  ({car?.category.name})
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          {user && (
            <View className="w-full mt-4">
              <Text className="text-black-300 text-xl font-rubik-bold">
                Your details
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <View className="flex flex-row items-center">
                  <Image
                    source={{
                      uri:
                        returnedUser?.image ??
                        user?.externalAccounts?.[0]?.imageUrl ??
                        user?.imageUrl,
                    }}
                    className="size-14 rounded-full border border-secondary-100"
                  />

                  <View className="flex flex-col items-start justify-center ml-7">
                    <Text className="text-lg text-black-300 text-start font-rubik-bold">
                      {returnedUser?.name ??
                        user?.fullName ??
                        "No name available"}
                    </Text>
                    <Text className="text-sm text-black-200 text-start font-rubik-medium">
                      {returnedUser?.email ??
                        user?.primaryEmailAddress?.emailAddress ??
                        "No email address"}
                    </Text>
                    <Text className="text-sm text-black-200 text-start font-rubik-medium">
                      {returnedUser?.phone ??
                        user?.primaryPhoneNumber ??
                        "No phone number available"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Directions
            </Text>

            <View className="flex w-full mt-4 px-3 py-4 rounded-lg relative">
              <View className="flex flex-row gap-2 items-center">
                {/* Image section */}
                <Image
                  source={{
                    uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destinationLongitude || departureLongitude},${destinationLatitude || departureLatitude}&zoom=14&marker=lonlat:${departureLongitude},${departureLatitude}&icon=${encodeURIComponent("https://api.geoapify.com/v1/icon/?icon=location-pin&color=%23FF0000&size=medium&type=awesome&apiKey=YOUR_API_KEY")}${destinationLongitude && destinationLatitude ? `&marker=lonlat:${destinationLongitude},${destinationLatitude}&icon=${encodeURIComponent(`https://api.geoapify.com/v1/icon/?icon=location-pin&color=%2300FF00&size=medium&type=awesome&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`)}` : ""}&path=lonlat:${departureLongitude},${departureLatitude}|lonlat:${destinationLongitude},${destinationLatitude}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
                  }}
                  className="w-1/3 h-32 rounded-lg border"
                />

                <View className="flex-1 mx-4">
                  <View className="flex-row items-center mb-2">
                    <Image source={icons.point} className="h-5 w-5" />
                    <Text className="ml-2 font-semibold">
                      {departureAddress}
                    </Text>
                  </View>
                  {destinationAddress && (
                    <View className="flex-row items-center mb-2">
                      <Image source={icons.to} className="h-5 w-5" />
                      <Text className="ml-2 font-semibold">
                        {destinationAddress}
                      </Text>
                    </View>
                  )}

                  {/* Date and book type */}
                  <View className="flex items-start justify-between w-full gap-1">
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-base font-rubik-bold text-secondary-100">
                        <Image source={icons.list} className="h-5 w-5" />
                        {"   "}
                        {bookType === "full_day" ? "Full day" : "Transfer"}
                      </Text>
                    </View>
                    <Text className="text-base font-rubik-bold text-secondary-100">
                      <Image source={icons.calender} className="h-5 w-5" />
                      {"   "}
                      {new Date(date).toLocaleDateString()},{" "}
                      {new Date(date).toLocaleTimeString()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Addons
            </Text>
            <View className="flex-row mt-4">
              {car?.addons?.map((addon, index) => {
                const icon = addonIcons[addon.addonName] || "❓";

                return (
                  <TouchableOpacity
                    key={index}
                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                  >
                    <Text className="text-xs text-secondary-600 font-rubik-medium">
                      +{addon.addonValue}
                    </Text>
                    <View
                      className={`size-14 rounded-full flex items-center justify-center ${
                        userAddons?.includes(addon.addonName)
                          ? "border border-gray-300 bg-primary-100"
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
                      selected={paymentType === "full"}
                      onSelect={handleSelectPaymentType}
                    />
                  </View>

                  <View className="flex flex-1 flex-col min-w-16 max-w-20">
                    <RadioButton
                      label="Reserve"
                      value="reserve"
                      selected={paymentType === "reserve"}
                      onSelect={handleSelectPaymentType}
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
                        onPress={(e) => handleSelect(addon.value)}
                        className={
                          paymentOption === addon.value
                            ? "bg-gray-100 rounded-full flex items-center justify-center p-2"
                            : "bg-gray-100 rounded-full flex items-center justify-center p-2"
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

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Terms & conditions
            </Text>

            <Checkbox checked={isAgreed} onChange={handleCheckboxChange} />
            {error && (
              <Text className="text-red-500 text-base font-rubik-semiBold">
                {error}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Total price
            </Text>
            <Text
              numberOfLines={1}
              className="text-secondary-100 text-start text-2xl font-rubik-bold"
            >
              Ksh.{paymentAmount}
            </Text>
          </View>

          <TouchableOpacity
            onPress={
              user
                ? handlePayment
                : () => router.push(`/(auth)/sign-in?id=${id}`)
            }
            className="flex-1 flex flex-row items-center justify-center bg-secondary-100 py-2 rounded-full shadow-md shadow-zinc-400"
          >
            <Text className="text-white text-lg text-center font-rubik-bold">
              {user ? "Check out" : "Login to check out"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookDetails;
